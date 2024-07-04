import bcrypt from 'bcrypt';

import { UserProps } from './../../models/User';
import prisma from '../../database';
import { ApiError } from '../../helpers/api-erros';

export const userExistsByEmail = async (email: string) => {
  try {
    const user = await prisma.users.findFirst({
      where: {
        email,
      },
    });

    return user;
  } catch {
    return false;
  }
};

export const userExistsById = async (id: string) => {
  try {
    const user = await prisma.users.findFirst({
      where: {
        id,
      },
    });

    return user;
  } catch {
    return false;
  }
};

export const getUserWithoutPassword = (userObject: UserProps | UserProps[]) => {
  if (Array.isArray(userObject)) {
    const users = userObject.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    return users;
  } else {
    const { password, ...userWithoutPassword } = userObject;
    return userWithoutPassword;
  }
};

export const updateNeeded = async (
  fieldsToUpdate: UserProps,
  oldUser: UserProps
): Promise<Boolean> => {
  let updateFlag = false;

  if (fieldsToUpdate.username && fieldsToUpdate.username !== oldUser.username)
    updateFlag = true;
  else if (fieldsToUpdate.email && fieldsToUpdate.email !== oldUser.email)
    updateFlag = true;
  else if (fieldsToUpdate.password) {
    const verifyPassword = await bcrypt.compare(
      fieldsToUpdate.password,
      oldUser.password
    );

    if (!verifyPassword) updateFlag = true;
  }

  return updateFlag;
};
