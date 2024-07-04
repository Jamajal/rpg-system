import { Request, Response } from 'express';
import { UserProps } from '../../models/User';
import prisma from '../../database';
import bcrypt from 'bcrypt';

import { getUserWithoutPassword, userExistsByEmail } from './utils';
import { ApiError, BadRequestError } from '../../helpers/api-erros';

export const createUser = async (req: Request, res: Response) => {
  const { username, email, password }: UserProps = req.body;

  if (!email || !username || !password) {
    throw new BadRequestError(
      'Não foram informados todas as informações necessárias.'
    );
  }

  const doesUserExists = await userExistsByEmail(email);
  if (doesUserExists) {
    throw new BadRequestError('Email de usuário já cadastrado.');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.users.create({
    data: {
      username,
      email,
      password: hashPassword,
    },
  });

  if (!newUser) {
    throw new ApiError('Algo deu errado', 500);
  }
  const userObject = getUserWithoutPassword(newUser);

  return res.json({
    message: `Usuário ${newUser.username} cadastrado com sucesso!`,
    object: userObject,
  });
};
