import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import prisma from '../database';

type JwtPayload = {
  id: string;
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

  const { password: _, ...loggedUser } = user;

  req.user = loggedUser;
  next();
};
