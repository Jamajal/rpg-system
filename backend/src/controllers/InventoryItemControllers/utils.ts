import prisma from '../../database';
import { InventoryItemProps } from '../../models/InventoryItem';

export const inventoryItemExistsById = async (id: string) => {
  try {
    const inventoryItem = await prisma.inventoryItem.findFirst({
      where: {
        id,
      },
    });

    return inventoryItem;
  } catch {
    return false;
  }
};

export const updateNeeded = async (
  fieldsToUpdate: InventoryItemProps,
  oldInventoryItem: InventoryItemProps
): Promise<Boolean> => {
  let updateFlag = false;

  const keys: (keyof InventoryItemProps)[] = [
    'name',
    'details',
    'space',
    'prestigy',
  ];

  keys.forEach((key) => {
    if (fieldsToUpdate[key] && fieldsToUpdate[key] !== oldInventoryItem[key]) {
      updateFlag = true;
    }
  });

  return updateFlag;
};
