import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { userExistsByEmail } from './utils';
import { ApiError, BadRequestError } from '../../helpers/api-erros';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email) {
    throw new BadRequestError('Email é obrigatório para login.');
  }

  if (!password) {
    throw new BadRequestError('Password é obrigatório para login.');
  }

  const user = await userExistsByEmail(email);

  if (!user) {
    throw new BadRequestError('Email ou senha inválidos.');
  }

  const verifyPassword = await bcrypt.compare(password, user.password);

  if (!verifyPassword) {
    throw new BadRequestError('Email ou senha inválidos.');
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SIGNATURE ?? '', {
    expiresIn: '8h',
  });

  const { password: _, ...userLogin } = user;

  if (userLogin) {
    return res.json({
      message: 'Login efetuado com sucesso!',
      object: {
        ...userLogin,
        token,
      },
    });
  }

  throw new ApiError('Algo deu errado ao autenticar o login.', 500);
};
