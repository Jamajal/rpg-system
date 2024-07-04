import prisma from '../../database';
import { AttackProps } from '../../models/Attack';

export const attackExistsById = async (id: string) => {
  try {
    const attack = await prisma.attacks.findFirst({
      where: {
        id,
      },
    });

    return attack;
  } catch {
    return false;
  }
};

export const updateNeeded = async (
  fieldsToUpdate: AttackProps,
  oldAttack: AttackProps
): Promise<Boolean> => {
  let updateFlag = false;

  const keys: (keyof AttackProps)[] = [
    'name',
    'type',
    'test',
    'range',
    'damage',
    'critic',
    'special',
  ];

  keys.forEach((key) => {
    if (fieldsToUpdate[key] && fieldsToUpdate[key] !== oldAttack[key]) {
      updateFlag = true;
    }
  });

  return updateFlag;
};
