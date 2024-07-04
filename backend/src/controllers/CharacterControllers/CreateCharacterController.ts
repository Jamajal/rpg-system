import { Request, Response } from 'express';
import { CharacterProps } from '../../models/Character';
import { ApiError, BadRequestError } from '../../helpers/api-erros';
import prisma from '../../database';

export const createCharacter = async (req: Request, res: Response) => {
  const {
    name,
    classes,
    genre,
    specie,
    background,
    userId,
    tableId,
    systemId,
  }: CharacterProps = req.body;

  if (
    !name ||
    !classes ||
    !genre ||
    !specie ||
    !background ||
    !userId ||
    tableId ||
    systemId
  ) {
    throw new BadRequestError(
      'Não foram informados todas as informações necessárias'
    );
  }

  const createdCharacter = await prisma.characters.create({
    data: {
      name,
      classes,
      genre,
      specie,
      background,
      userId,
      tableId,
      systemId,
    },
  });

  if (!createdCharacter) {
    throw new ApiError('Algo deu errado ao criar o personagem', 500);
  }

  return res.json({
    message: `Personagem "${name}" criado com sucesso!`,
    object: { createdCharacter },
  });
};
