import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../../database';
import {
  ApiError,
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../../helpers/api-erros';
import { tableExistsById, updateNeeded } from './utils';
import { TableUserProps } from '../../models/TablePlayer';

export const updateTable = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, password, requester, status, masterId, playerId, characters } =
    req.body;

  if (!id) {
    throw new BadRequestError('Id da requisição não informado.');
  }

  if (!name && !password && !status && !masterId && !playerId && !characters) {
    throw new BadRequestError('Nenhum campo para alteração informado.');
  }

  const oldTable = await tableExistsById(id);

  if (!oldTable) {
    throw new NotFoundError('Mesa não encontrada.');
  }

  if (
    (!requester && name) ||
    (!requester && password) ||
    (!requester && status) ||
    (!requester && masterId)
  ) {
    throw new BadRequestError('Necessário informar o solicitante.');
  }

  if (
    (name || password || status || masterId) &&
    oldTable.masterId !== requester
  ) {
    throw new UnauthorizedError(
      'Somente o criador da mesa pode fazer estas alterações'
    );
  }

  const isUpdateNeeded = await updateNeeded(
    { name, password, status, masterId, playerId, characters },
    oldTable
  );

  if (!isUpdateNeeded) {
    throw new ApiError('Os campos já estão atualizados.', 304);
  }

  let hashPassword = oldTable.password;

  if (password) {
    hashPassword = await bcrypt.hash(password, 10);
  }
  let players: TableUserProps[] = [];
  try {
    players = await prisma.tableUsers.findMany({
      where: {
        tableId: oldTable.id,
      },
    });

    let playerTable = await prisma.tableUsers.create({
      data: {
        tableId: oldTable.id,
        userId: playerId,
      },
    });

    players.push(playerTable);
  } catch {}

  try {
    const updatedTable = await prisma.tables.update({
      where: {
        id,
      },
      data: {
        name,
        password: hashPassword,
        status,
        masterId,
        players: {
          set: players.map((player: TableUserProps) => ({ id: player.id })),
        },
      },
    });

    return res.json({
      message: `Mesa "${updatedTable.name}" atualizada com sucesso.`,
    });
  } catch (erro) {
    throw new ApiError('Erro ao atualizar mesa', 500);
  }
};
