import { Request, Response } from 'express';
import {
  ApiError,
  BadRequestError,
  NotFoundError,
  NotModified,
} from '../../helpers/api-erros';
import { attributeExistsById, updateNeeded } from './utils';
import prisma from '../../database';

export const updateAttribute = async (req: Request, res: Response) => {
  const id = req.params.id;
  const inputs = req.body;

  if (!id) {
    throw new BadRequestError('Id não informado.');
  }

  if (Object.keys(inputs).length === 0) {
    throw new BadRequestError('Nenhum campo para alteração informado.');
  }

  const oldAttributes = await attributeExistsById(id);

  if (!oldAttributes) {
    throw new NotFoundError('Atributos não encontrados no banco de dados.');
  }

  const attributeUpdateNeeded = await updateNeeded(inputs, oldAttributes);

  if (!attributeUpdateNeeded) {
    throw new NotModified('');
  }

  try {
    const attribute = await prisma.attributes.update({
      where: {
        id,
      },
      data: inputs,
    });

    if (attribute) {
      return res.json({
        message: 'Atributos atualizados com sucesso.',
        object: attribute,
      });
    }
  } catch {
    throw new ApiError('Algo deu errado ao atualizar os atributos.', 500);
  }
};
