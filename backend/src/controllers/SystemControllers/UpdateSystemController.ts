import { Request, Response } from 'express';
import {
  ApiError,
  BadRequestError,
  NotFoundError,
  NotModified,
} from '../../helpers/api-erros';
import { systemExistsById, updateNeeded } from './utils';
import { SystemProps } from '../../models/System';
import prisma from '../../database';

export const updateSystem = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, description } = req.body;

  if (!id) {
    throw new BadRequestError('Id não informado.');
  }

  if (!name && !description) {
    throw new BadRequestError('Nenhum campo para alteração informado.');
  }

  const oldSystem = await systemExistsById(id);

  if (!oldSystem) {
    throw new NotFoundError('Sistema não encontrado.');
  }

  const systemUpdateNeeded = await updateNeeded(
    { name, description },
    oldSystem
  );

  if (!systemUpdateNeeded) {
    throw new NotModified('Os campos estão atualizados.');
  }

  try {
    const system = await prisma.system.update({
      where: {
        id,
      },
      data: {
        name,
        description,
      },
    });

    if (system) {
      return res.json({
        message: `Sistema "${system.name}" atualizado com sucesso.`,
        object: system,
      });
    }
  } catch {
    throw new ApiError('Algo deu errado ao tentar atualizar o sistema', 500);
  }
};
