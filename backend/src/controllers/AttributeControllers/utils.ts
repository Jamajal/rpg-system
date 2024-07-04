import prisma from '../../database';
import { AttributeProps } from '../../models/Attribute';

export const attributeExistsById = async (id: string) => {
  try {
    const attribute = await prisma.attributes.findFirst({
      where: {
        id,
      },
    });

    return attribute;
  } catch {
    return false;
  }
};

export const updateNeeded = async (
  fieldsToUpdate: AttributeProps,
  oldAttribute: AttributeProps
): Promise<Boolean> => {
  let updateFlag = false;

  const keys: (keyof AttributeProps)[] = [
    'strength',
    'agility',
    'intellect',
    'presence',
    'vigor',
  ];

  keys.forEach((key) => {
    if (
      (fieldsToUpdate[key] || typeof fieldsToUpdate[key] === 'number') &&
      fieldsToUpdate[key] !== oldAttribute[key]
    ) {
      updateFlag = true;
    }
  });

  return updateFlag;
};
