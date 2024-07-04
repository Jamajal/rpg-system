import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import prisma from '../../database';
import { BadRequestError, NotFoundError } from '../../helpers/api-erros';
import { getUserWithoutPassword } from './utils';
import { UserProps } from '../../models/User';

type JwtPayload = {
  id: string;
};

export const validateToken = async (req: Request, res: Response) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      message: 'Você não tem autorização de acesso!',
      object: {},
    });
  }

  const token = authorization.split(' ')[1];
  const signature = process.env.JWT_SIGNATURE;

  if (!signature) {
    return res.status(500).json({
      message: 'Algo deu errado ao verificar autorização',
      object: {},
    });
  }

  let tokenVerification;
  try {
    tokenVerification = jwt.verify(token, signature) as JwtPayload;
  } catch {
    tokenVerification = null;
  }

  if (!tokenVerification) {
    return res.status(401).json({
      message: 'Você não tem autorização de acesso!',
      object: {},
    });
  }

  let user;
  try {
    user = await prisma.users.findUnique({
      where: {
        id: tokenVerification.id ?? '',
      },
      include: {
        characters: true,
        masterOfTables: true,
        playerOfTables: true,
      },
    });
  } catch (error) {
    user = null;
  }

  if (!user) {
    return res.status(500).json({
      message: 'Algo deu errado ao verificar a autorização!',
      object: {},
    });
  }

  return res.json({
    message: 'Token válido.',
    object: user,
  });
};

export const getAllUsers = async (req: Request, res: Response) => {
  const users: UserProps[] = await prisma.users.findMany({
    include: {
      //characters: true,
      masterOfTables: true,
      playerOfTables: true,
    },
  });

  if (users && users.length) {
    const usersObject = getUserWithoutPassword(users);

    return res.json({
      message: 'Usuários buscados com sucesso.',
      object: usersObject,
    });
  }

  throw new NotFoundError(
    'Não foi encontrado nenhum usuário no banco de dados.'
  );
};

export const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    throw new BadRequestError('Id de usuário não encontrado.');
  }

  const user = await prisma.users.findUnique({
    where: {
      id,
    },
    include: {
      //characters: true,
      masterOfTables: true,
      playerOfTables: true,
    },
  });

  if (!user) {
    throw new NotFoundError(
      'Não foi encontrado nenhum usuário com Id informado.'
    );
  }

  const userObject = getUserWithoutPassword(user);

  return res.json({
    message: `Usuário ${user.username} encontrado com sucesso`,
    object: userObject,
  });
};
