import prisma from '../../database';
import bcrypt from 'bcrypt';
import { TableProps } from '../../models/Table';

export const tableExistsById = async (id: string) => {
  try {
    const table = await prisma.tables.findFirst({
      where: {
        id,
      },
    });

    return table;
  } catch {
    return false;
  }
};

export const getTableWithoutPassword = (
  tableObject: TableProps | TableProps[]
) => {
  if (Array.isArray(tableObject)) {
    const tables = tableObject.map((table) => {
      const { password, ...tableWithoutPassword } = table;
      return tableWithoutPassword;
    });

    return tables;
  } else {
    const { password, ...tableWithoutPassword } = tableObject;
    return tableWithoutPassword;
  }
};

export const updateNeeded = async (
  fieldsToUpdate: TableProps,
  oldTable: TableProps
): Promise<Boolean> => {
  let updateFlag = false;

  const keys: (keyof TableProps)[] = [
    'name',
    'status',
    'masterId',
    'playerId',
    'characters',
  ];

  keys.forEach((key) => {
    if (fieldsToUpdate[key] && fieldsToUpdate[key] !== oldTable[key]) {
      updateFlag = true;
    }
  });

  if (fieldsToUpdate.password) {
    const verifyPassword = await bcrypt.compare(
      fieldsToUpdate.password,
      oldTable.password
    );
    if (!verifyPassword) {
      updateFlag = true;
    }
  }

  return updateFlag;
};
