import { Request, Response } from 'express';
import {
  ApiError,
  BadRequestError,
  NotFoundError,
} from '../../helpers/api-erros';
import { attackExistsById } from './utils';
import prisma from '../../database';

export const deleteAttack = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    throw new BadRequestError('Id não informado');
  }

  const doesAttackExists = attackExistsById(id);
  if (!doesAttackExists) {
    throw new NotFoundError('Nenhuma arma encontrada com id fornecido.');
  }

  try {
    const attack = await prisma.attacks.delete({
      where: {
        id,
      },
    });

    return res.json({
      message: `Arma "${attack.name} deletada com sucesso."`,
      object: {},
    });
  } catch {
    throw new ApiError('Algo deu errado ao deletar a arma', 500);
  }
};
