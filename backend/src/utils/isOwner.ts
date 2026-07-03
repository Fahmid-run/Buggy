import { prisma } from '../lib/prisma';

export const isBugOwner = async (user: any, bugId: string) => {
  const bug = await prisma.bugs.findUniqueOrThrow({
    where: {
      id: bugId,
    },
  });

  const isOwnerOfBug = user.id === bug.authorId;

  return isOwnerOfBug;
};



export const isProjectOwner = async (user: any, projectId: string) => {
  const bug = await prisma.projects.findUniqueOrThrow({
    where: {
      id: projectId,
    },
  });

  const isOwnerOfproject = (user.id === bug.authorId);

  return isOwnerOfproject
};
