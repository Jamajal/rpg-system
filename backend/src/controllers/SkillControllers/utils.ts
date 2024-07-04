import bcrypt from 'bcrypt';

import prisma from '../../database';
import { SkillProps } from '../../models/Skill';

export const skillExistsById = async (id: string) => {
  try {
    const skill = await prisma.skills.findFirst({
      where: {
        id,
      },
    });

    return skill;
  } catch {
    return false;
  }
};

export const updateNeeded = async (
  fieldsToUpdate: SkillProps,
  oldSkill: SkillProps
): Promise<Boolean> => {
  let updateFlag = false;

  const keys: (keyof SkillProps)[] = [
    'acrobatics',
    'training',
    'arts',
    'atletics',
    'currentAfairs',
    'science',
    'crime',
    'diplomacy',
    'deception',
    'fortitude',
    'initiative',
    'intimidation',
    'insight',
    'investigation',
    'fight',
    'medicine',
    'occultism',
    'perception',
    'piloting',
    'aiming',
    'professionName',
    'profession',
    'reflexes',
    'religion',
    'survival',
    'tactics',
    'tecnology',
    'will',
  ];

  keys.forEach((key) => {
    if (fieldsToUpdate[key] && fieldsToUpdate[key] !== oldSkill[key]) {
      updateFlag = true;
    }
  });

  return updateFlag;
};
