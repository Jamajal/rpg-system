import { Request, Response } from 'express';
import { ApiError, BadRequestError } from '../../helpers/api-erros';
import prisma from '../../database';

export const createSystem = async (req: Request, res: Response) => {
  const { name, description } = req.body;

  if (!name || !description) {
    throw new BadRequestError(
      'Todos os campos obrigatórios não foram informados.'
    );
  }

  try {
    const system = await prisma.system.create({
      data: {
        name,
        description,
      },
    });

    if (system) {
      return res.json({
        message: `Sistema "${system.name}" criado com sucesso.`,
        object: system,
      });
    }
  } catch {
    throw new ApiError('Algo deu errado ao crair o sistema', 500);
  }
};
