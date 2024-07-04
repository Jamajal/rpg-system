import prisma from '../../database';
import { SystemProps } from '../../models/System';

export const systemExistsById = async (
  id: string
): Promise<SystemProps | false | null> => {
  try {
    const system = await prisma.system.findFirst({
      where: {
        id,
      },
    });

    return system;
  } catch {
    return false;
  }
};

export const updateNeeded = async (
  fieldsToUpdate: SystemProps,
  oldSystem: SystemProps
): Promise<Boolean> => {
  let updateFlag = false;

  const keys: (keyof SystemProps)[] = ['name', 'description'];

  keys.forEach((key) => {
    if (fieldsToUpdate[key] && fieldsToUpdate[key] !== oldSystem[key]) {
      updateFlag = true;
    }
  });

  return updateFlag;
};
