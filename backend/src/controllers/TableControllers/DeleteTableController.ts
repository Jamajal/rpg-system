import { Request, Response } from 'express';
import prisma from '../../database';
import { BadRequestError } from '../../helpers/api-erros';

export const deleteTable = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    throw new BadRequestError('Id da requisição não informado.');
  }

  const table = await prisma.tables.delete({
    where: {
      id,
    },
  });

  return res.json({
    message: `Mesa "${table.name}" deletado com sucesso.`,
    object: {},
  });
};
