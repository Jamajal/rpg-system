import { Request, Response } from 'express';
import {
  ApiError,
  BadRequestError,
  NotFoundError,
  NotModified,
} from '../../helpers/api-erros';
import { skillExistsById, updateNeeded } from './utils';
import prisma from '../../database';
import { SkillProps } from '../../models/Skill';

export const updateSkill = async (req: Request, res: Response) => {
  const id = req.params.id;
  const input: SkillProps = req.body;

  if (!id) {
    throw new BadRequestError('Id de perícia não informado.');
  }

  const oldSkill: any = await skillExistsById(id);

  if (!oldSkill) {
    throw new NotFoundError('Nenhuma perícia encontrada com este id.');
  }

  const skillKeys = Object.keys(input);
  const updateSkill: SkillProps = {};

  if (!skillKeys.length) {
    throw new BadRequestError('Nenhum campo para atualização informado.');
  }

  const needToUpdate = await updateNeeded(input, oldSkill);

  if (!needToUpdate) {
    throw new NotModified('Nenhuma atualização pra fazer');
  }

  skillKeys.forEach((skill) => {
    updateSkill[skill] = input[skill] ?? oldSkill[skill];
  });

  try {
    const skill = await prisma.skills.update({
      where: {
        id,
      },
      data: {
        acrobatics: input.acrobatics,
        training: input.training,
        arts: input.arts,
        atletics: input.atletics,
        currentAfairs: input.currentAfairs,
        science: input.science,
        crime: input.crime,
        diplomacy: input.diplomacy,
        deception: input.deception,
        fortitude: input.fortitude,
        initiative: input.initiative,
        intimidation: input.intimidation,
        insight: input.insight,
        investigation: input.investigation,
        fight: input.fight,
        medicine: input.medicine,
        occultism: input.occultism,
        perception: input.perception,
        piloting: input.piloting,
        aiming: input.aiming,
        professionName: input.professionName,
        profession: input.profession,
        reflexes: input.reflexes,
        religion: input.religion,
        survival: input.survival,
        tactics: input.tactics,
        tecnology: input.tecnology,
        will: input.will,
      },
    });

    if (skill) {
      return res.json({
        message: 'Perícia atualizada com sucesso.',
        object: skill,
      });
    }
  } catch {
    throw new ApiError('Algo deu errado ao atualizar a perícia.', 500);
  }

  throw new NotFoundError('Nenhuma perícia encontrada com este id.');
};
