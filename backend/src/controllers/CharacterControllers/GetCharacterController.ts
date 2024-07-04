import { Request, Response } from 'express';
import prisma from '../../database';
import { BadRequestError, NotFoundError } from '../../helpers/api-erros';
//import { getUserWithoutPassword } from './utils';

export const getAllCharacters = async (req: Request, res: Response) => {
  const characters = await prisma.characters.findMany();

  if (characters && characters.length) {
    return res.json({
      message: 'Personagens buscados com sucesso.',
      object: characters,
    });
  }

  throw new NotFoundError(
    'Não foi encontrado nenhum personagem no banco de dados.'
  );
};

export const getCharacterById = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    throw new BadRequestError('Id de personagem não encontrado.');
  }

  const character = await prisma.characters.findUnique({
    where: {
      id,
    },
  });

  if (!character) {
    throw new NotFoundError(
      'Não foi encontrado nenhum personagem com Id informado.'
    );
  }

  return res.json({
    message: `Personagem ${character.name} encontrado com sucesso`,
    object: character,
  });
};
