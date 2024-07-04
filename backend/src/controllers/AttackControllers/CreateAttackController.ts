import { Request, Response } from 'express';
import { AttackProps } from '../../models/Attack';
import { ApiError, BadRequestError } from '../../helpers/api-erros';
import prisma from '../../database';

export const createAttack = async (req: Request, res: Response) => {
  const input: AttackProps = req.body;

  const requiredProps = [
    'name',
    'type',
    'test',
    'range',
    'damage',
    'critic',
    'special',
  ];

  const hasAllProps = requiredProps.every((prop) => prop in input);
  if (!hasAllProps) {
    throw new BadRequestError('Não foram informadas todas as informações');
  }

  try {
    const attack: AttackProps = await prisma.attacks.create({
      data: input,
    });

    if (attack) {
      return res.json({
        message: `Arma "${attack.name} criada com sucesso."`,
        object: attack,
      });
    }

    throw new ApiError('Não foi possível criar a arma.', 500);
  } catch (error) {
    console.log(error);

    throw new ApiError('Algo deu errado ao tentar criar a arma', 500);
  }
};
