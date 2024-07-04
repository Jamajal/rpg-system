import { Request, Response } from 'express';
import prisma from '../../database';
import {
  ApiError,
  BadRequestError,
  NotFoundError,
} from '../../helpers/api-erros';

export const getAllAttributes = async (req: Request, res: Response) => {
  try {
    const attributes = await prisma.attributes.findMany();

    if (attributes && attributes.length) {
      return res.json({
        message: 'Atributos buscados com sucesso.',
        object: attributes,
      });
    }
  } catch {
    throw new ApiError('Algo deu errado ao tentar buscar os atributos.', 500);
  }

  throw new NotFoundError('Não foi encontrado atributos no banco de dados.');
};

export const getAttributeById = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    throw new BadRequestError('Id não informado.');
  }

  try {
    const attribute = await prisma.attributes.findUnique({
      where: {
        id,
      },
    });

    if (attribute) {
      return res.json({
        message: 'Atributo buscado com sucesso.',
        object: attribute,
      });
    }
  } catch {
    throw new ApiError('Algo deu errado ao tentar buscar os atributos', 500);
  }

  throw new NotFoundError('Não foi encontrado os atributos.');
};
