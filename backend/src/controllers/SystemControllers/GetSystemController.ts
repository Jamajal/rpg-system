import { Request, Response } from 'express';
import {
  ApiError,
  BadRequestError,
  NotFoundError,
} from '../../helpers/api-erros';
import prisma from '../../database';

export const getAllSystem = async (req: Request, res: Response) => {
  try {
    const systems = await prisma.system.findMany();

    if (systems && systems.length) {
      return res.json({
        message: 'Sistemas buscados com sucesso.',
        object: systems,
      });
    }
  } catch {
    throw new ApiError('Algo deu errado ao tentar buscar os sistemas', 500);
  }

  throw new NotFoundError('Nenhum sistema no banco de dados.');
};

export const getSystemById = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    throw new BadRequestError('Id não informado');
  }
  try {
    const system = await prisma.system.findUnique({
      where: {
        id,
      },
    });

    if (system) {
      return res.json({
        message: `Sistema "${system.name} buscado com sucesso."`,
        object: system,
      });
    }
  } catch {
    throw new ApiError('Algo deu errado ao tentar buscar o sistema', 500);
  }

  throw new NotFoundError('Sistema não encontrado no banco de dados.');
};
