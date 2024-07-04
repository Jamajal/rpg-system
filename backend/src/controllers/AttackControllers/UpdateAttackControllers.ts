import { Request, Response } from 'express';
import {
  ApiError,
  BadRequestError,
  NotFoundError,
  NotModified,
} from '../../helpers/api-erros';
import { updateNeeded, attackExistsById } from './utils';
import { AttackProps } from '../../models/Attack';
import prisma from '../../database';

export const updateAttack = async (req: Request, res: Response) => {
  const id = req.params.id;
  const input: AttackProps = req.body;

  if (!input) {
    throw new BadRequestError('Informações necessárias não informadas.');
  }

  if (!id) {
    throw new BadRequestError('Id não informado');
  }

  const oldAttack = await attackExistsById(id);
  if (!oldAttack) {
    throw new NotFoundError('Nenhuma arma encontrada com id fornecido.');
  }

  const doesUpdateNeeded = await updateNeeded(input, oldAttack);

  if (!doesUpdateNeeded) {
    throw new NotModified('Os campos já estão autalizados');
  }

  try {
    const attack = await prisma.attacks.update({
      where: {
        id,
      },
      data: input,
    });

    res.json({
      message: `Arma "${attack.name}" atualizada com sucesso.`,
      object: attack,
    });
  } catch {
    throw new ApiError('Algo deu errado ao atualizar arma', 500);
  }
};
