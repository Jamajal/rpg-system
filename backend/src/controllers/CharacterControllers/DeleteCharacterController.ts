import { Request, Response } from 'express';
import prisma from '../../database';
import { BadRequestError } from '../../helpers/api-erros';

export const deleteCharacter = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    throw new BadRequestError('Id da requisição não informado.');
  }

  const character = await prisma.characters.delete({
    where: {
      id,
    },
  });

  return res.json({
    message: `Personagem "${character.name}" deletado com sucesso.`,
    object: {},
  });
};
