import { Request, Response } from 'express';
import prisma from '../../database';
import { ApiError, BadRequestError } from '../../helpers/api-erros';
import { getTableWithoutPassword } from './utils';

const generateCode = async () => {
  let codePrefix = 'T-';
  let nextCodeNumber = 1;

  try {
    const mostRecentTable = await prisma.tables.findFirst({
      orderBy: {
        created_at: 'desc',
      },
    });

    if (mostRecentTable) {
      const currentCodeNumber = parseInt(
        mostRecentTable.code.replace('T-', ''),
        10
      );
      nextCodeNumber = currentCodeNumber + 1;
    }
  } catch {}

  let codeNumberToString = nextCodeNumber.toString();

  while (codeNumberToString.length < 4) {
    codeNumberToString = '0' + codeNumberToString;
  }

  return codePrefix + codeNumberToString;
};

export const createTable = async (req: Request, res: Response) => {
  const { name, password, masterId, players, characters, systemId } = req.body;

  if (!name || !password || !masterId) {
    throw new BadRequestError(
      'Não foram informados todas as informações necessárias'
    );
  }

  const code = await generateCode();

  const createdTable = await prisma.tables.create({
    data: {
      name,
      password,
      code,
      masterId,
      players,
      characters,
      systemId,
    },
  });

  if (!createdTable) {
    throw new ApiError('Algo deu errado ao crir a mesa', 500);
  }

  const getObject = getTableWithoutPassword(createdTable);

  return res.json({
    message: `Mesa "${name}" cadastrada com sucesso!`,
    object: { getObject },
  });
};
