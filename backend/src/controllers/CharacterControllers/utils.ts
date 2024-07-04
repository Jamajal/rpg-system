import prisma from '../../database';
import { CharacterProps } from '../../models/Character';

export const characterExistsById = async (id: string) => {
  try {
    const character = await prisma.characters.findFirst({
      where: {
        id,
      },
    });

    return character;
  } catch {
    return false;
  }
};

export const updateNeeded = async (
  fieldsToUpdate: CharacterProps,
  oldCharacter: CharacterProps
): Promise<Boolean> => {
  let updateFlag = false;

  const keys: (keyof CharacterProps)[] = [
    'name',
    'genre',
    'specie',
    'classes',
    'background',
    'userId',
  ];

  keys.forEach((key) => {
    if (fieldsToUpdate[key] && fieldsToUpdate[key] !== oldCharacter[key]) {
      updateFlag = true;
    }
  });

  if (typeof fieldsToUpdate.tableId === 'string') {
    updateFlag = true;
  }

  return updateFlag;
};
