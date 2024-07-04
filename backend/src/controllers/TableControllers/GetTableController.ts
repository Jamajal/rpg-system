import { Request, Response } from 'express';
import prisma from '../../database';
import { getTableWithoutPassword } from './utils';
import {
  ApiError,
  BadRequestError,
  NotFoundError,
} from '../../helpers/api-erros';
import { log } from 'console';

export const getAllTables = async (req: Request, res: Response) => {
  const tables = await prisma.tables.findMany({
    include: {
      characters: true,
      players: true,
    },
  });

  if (tables && tables.length) {
    const tablesObject = getTableWithoutPassword(tables);

    return res.json({
      message: 'Mesas buscadas com sucesso.',
      object: tablesObject,
    });
  }

  throw new NotFoundError(
    'Não foi encontrado nenhum usuário no banco de dados.'
  );
};

export const getAllActiveTables = async (req: Request, res: Response) => {
  const tables = await prisma.tables.findMany({
    where: {
      status: true,
    },
  });

  if (tables && tables.length) {
    const tablesObject = getTableWithoutPassword(tables);

    return res.json({
      message: 'Mesas ativas buscadas com sucesso.',
      object: tablesObject,
    });
  }

  throw new NotFoundError(
    'Não foi encontrado nenhum usuário no banco de dados.'
  );
};

export const getOneTable = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (id) {
    try {
      const table = await prisma.tables.findUnique({
        where: {
          id,
        },
        include: {
          characters: true,
          players: true,
        },
      });
      if (table) {
        return res.json({
          error: false,
          status: 200,
          message: `Mesa ${table.name} encontrada com sucesso!`,
          object: { table },
        });
      }

      throw new ApiError('Algo deu errado', 500);
    } catch {
      throw new NotFoundError('Mesa não encontrada.');
    }
  }

  throw new BadRequestError('Id não informado.');
};
