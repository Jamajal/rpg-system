import { Request, Response } from 'express';
import prisma from '../../database';
import { ApiError } from '../../helpers/api-erros';

export const createAttribute = async (req: Request, res: Response) => {
  const { strength, agility, intellect, vigor, presence } = req.body;

  const attributesToApply = {
    strength: strength ?? 0,
    agility: agility ?? 0,
    intellect: intellect ?? 0,
    vigor: vigor ?? 0,
    presence: presence ?? 0,
  };

  try {
    const attribute = await prisma.attributes.create({
      data: attributesToApply,
    });

    if (attribute) {
      return res.json({
        message: 'Attributos criados com sucesso.',
        object: attribute,
      });
    }
  } catch {
    throw new ApiError('Algo deu errado ao criar os attributos', 500);
  }
};
