import { Request, Response } from 'express';
import prisma from '../../database';
import { ApiError } from '../../helpers/api-erros';

export const deleteSkill = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const skill = await prisma.skills.delete({
      where: {
        id,
      },
    });

    return res.json({
      message: 'Perícia deletada com sucesso.',
      object: {},
    });
  } catch {
    throw new ApiError('Algo deu errado ao deletar a perícia', 500);
  }
};
