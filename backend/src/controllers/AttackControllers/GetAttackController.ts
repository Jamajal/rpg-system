import { Request, Response } from 'express';
import prisma from '../../database';
import {
  ApiError,
  BadRequestError,
  NotFoundError,
} from '../../helpers/api-erros';
import { attackExistsById } from './utils';

export const getAllAttacks = async (req: Request, res: Response) => {
  const attacks = await prisma.attacks.findMany();

  if (attacks && attacks.length) {
    res.json({
      message: 'Armas encontradas com sucesso.',
      object: attacks,
    });
  }

  throw new NotFoundError('Nenhuma arma foi encontrada.');
};

export const getAttackById = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    throw new BadRequestError('Id não informado.');
  }

  const doesAttackExists = attackExistsById(id);
  if (!doesAttackExists) {
    throw new NotFoundError('Nenhuma arma encontrada com id fornecido.');
  }

  try {
    const attack = await prisma.attacks.findUnique({
      where: {
        id,
      },
    });

    if (!attack) {
      throw new NotFoundError('Nenhuma arma com id fornecido.');
    }

    return res.json({
      message: `Arma "${attack.name} encontrada com sucesso."`,
      object: attack,
    });
  } catch {
    throw new ApiError('Algo deu errado ao tentar encontrar arma.', 500);
  }
};
