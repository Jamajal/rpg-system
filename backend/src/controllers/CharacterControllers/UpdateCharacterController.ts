import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../../database';
import {
  ApiError,
  BadRequestError,
  NotFoundError,
} from '../../helpers/api-erros';
import { characterExistsById, updateNeeded } from './utils';

export const updateCharacter = async (req: Request, res: Response) => {
  const id = req.params.id;
  const {
    name,
    genre,
    specie,
    classes,
    background,
    userId,
    tableId,
    systemId,
  } = req.body;

  if (!id) {
    throw new BadRequestError('Id da requisição não informado.');
  }

  if (
    !name &&
    !genre &&
    !specie &&
    !classes &&
    !background &&
    !systemId &&
    typeof tableId === 'undefined'
  ) {
    throw new BadRequestError('Nenhum campo para alteração informado.');
  }

  const oldCharacter = await characterExistsById(id);

  if (!oldCharacter) {
    throw new NotFoundError('Personagem não encontrado.');
  }

  const isUpdateNeeded = await updateNeeded(
    { name, genre, specie, classes, background, userId, tableId, systemId },
    oldCharacter
  );

  if (!isUpdateNeeded) {
    throw new ApiError('Os campos já estão atualizados.', 304);
  }

  const tableIdToUpdate = tableId ? tableId : null;

  try {
    const updatedCharacter = await prisma.characters.update({
      where: {
        id,
      },
      data: {
        name,
        genre,
        specie,
        classes,
        background,
        systemId,
        tableId: tableIdToUpdate,
      },
    });

    return res.json({
      message: `Personagem "${updatedCharacter.name}" atualizado com sucesso.`,
    });
  } catch (erro) {
    console.log(erro);

    throw new ApiError('Erro ao atualizar personagem', 500);
  }
};
