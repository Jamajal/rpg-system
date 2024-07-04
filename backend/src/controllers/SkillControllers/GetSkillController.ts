import { Request, Response } from 'express';
import prisma from '../../database';
import {
  ApiError,
  BadRequestError,
  NotFoundError,
} from '../../helpers/api-erros';

export const getAllSkills = async (req: Request, res: Response) => {
  try {
    const skills = await prisma.skills.findMany();

    if (skills && skills.length) {
      return res.json({
        message: 'Perícias buscadas com sucesso.',
        object: skills,
      });
    }
  } catch {
    throw new ApiError('Algo deu errado ao tentar buscar as perícias.', 500);
  }

  throw new NotFoundError('Nenhuma perícia no banco de dados.');
};

export const getSkillById = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    throw new BadRequestError('Id não informado.');
  }

  try {
    const skill = await prisma.skills.findUnique({
      where: {
        id,
      },
    });

    if (skill) {
      return res.json({
        message: 'Perícias buscadas com sucesso.',
        object: skill,
      });
    }
  } catch {
    throw new ApiError('Algo deu errado ao buscar a perícia.', 500);
  }

  throw new NotFoundError('Não foi encontrado nenhuma perícia com esse id.');
};
