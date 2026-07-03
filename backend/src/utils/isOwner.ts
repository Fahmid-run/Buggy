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



export const isProjectOwner = async (id: string, projectId: string) => {
  const project = await prisma.projects.findUniqueOrThrow({
    where: {
      id: projectId,
    },
  });

  
  const isProjectOwner=(id=== project.authorId)

  return isProjectOwner;
};
