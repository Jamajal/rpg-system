import { Request, Response } from 'express';
import { SkillProps } from '../../models/Skill';
import prisma from '../../database';
import { ApiError, NotFoundError } from '../../helpers/api-erros';

export const createSkill = async (req: Request, res: Response) => {
  const input: SkillProps = req.body;

  const skillNames = Object.keys(input);
  const filteredSkillNames = skillNames.filter(
    (skill) => skill !== 'professionName'
  );

  filteredSkillNames.forEach((skill: string) => {
    if (!input[skill] || !Number.isInteger(input[skill])) {
      input[skill] = 0;
    }
  });

  try {
    const createdSkill = await prisma.skills.create({
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

    if (createdSkill) {
      return res.json({
        message: `Perícia criada com sucesso.`,
        object: createdSkill,
      });
    }
  } catch (error) {
    console.log(error);

    throw new ApiError('Algo deu errado ao criar perícia.', 500);
  }

  throw new NotFoundError('Não foi encontrado nenhum perícia.');
};
