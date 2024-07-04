import { Request, Response } from 'express';
import { BadRequestError, NotFoundError } from '../../helpers/api-erros';
import prisma from '../../database';

export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    throw new BadRequestError('Id da requisição não informado.');
  }

  const user = await prisma.users.delete({
    where: {
      id,
    },
  });

  return res.json({
    message: `Usuário "${user.username}" deletado com sucesso.`,
    object: {},
  });
};
