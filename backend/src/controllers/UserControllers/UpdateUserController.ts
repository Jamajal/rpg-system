import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { updateNeeded, userExistsByEmail, userExistsById } from './utils';
import {
  ApiError,
  BadRequestError,
  NotFoundError,
} from '../../helpers/api-erros';
import prisma from '../../database';

export const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { username, password, email } = req.body;

  if (!id) {
    throw new BadRequestError('Id da requisição não informado.');
  }

  if (!username && !password && !email) {
    throw new BadRequestError('Nenhum campo para alteração informado.');
  }

  const oldUser = await userExistsById(id);
  if (email) {
    const emailAlreadyInUse = await userExistsByEmail(email);
    if (emailAlreadyInUse) {
      throw new BadRequestError('Email está indisponível');
    }
  }

  if (!oldUser) {
    throw new NotFoundError('Usuário não encontrado.');
  }

  const isUpdateNeeded = await updateNeeded(
    { username, email, password },
    oldUser
  );

  if (!isUpdateNeeded) {
    throw new ApiError('Os campos já estão atualizados.', 304);
  }

  let hashPassword = oldUser.password;

  if (password) {
    hashPassword = await bcrypt.hash(password, 10);
  }

  try {
    const updatedUser = await prisma.users.update({
      where: {
        id,
      },
      data: {
        username,
        email,
        password: hashPassword,
      },
    });

    return res.json({
      message: `Usuário ${updatedUser.username} atualizado com sucesso.`,
    });
  } catch {
    throw new ApiError('Erro ao atualizar usuário', 500);
  }
};
