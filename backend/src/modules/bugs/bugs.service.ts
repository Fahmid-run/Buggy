import { prisma } from '../../lib/prisma';
import { isBugOwner } from '../../utils/isOwner';

const createBugIntoDb = async (authorId: string,projectId:string, payload:any) => {
  const result = await prisma.bugs.create({
    data: {
      ...payload,
      authorId,
      projectId
    },
  });

  return result;
};

const findAllBugsFromDb = async () => {
  const result = await prisma.bugs.findMany({});

  return result;
};

const findBugByProjectId = async (projectId: string) => {
  const result = await prisma.bugs.findUniqueOrThrow({
    where: {
      id: projectId,
    },
    include: {
      project:true,
      author: {
        omit: {
          password: true,
        },
      },
      bugs: true,
    },
  });

  return result;
};

const findAuthorBug = async (authorId: string) => {
  const result = await prisma.bugs.findMany({
    where: {
      authorId,
    },
    include: {
      project:true,
      author: {
        omit: {
          password: true,
        },
      },
      bugs: true,
    },
  });

  return result;
};

const updateBug = async (projectId: string,isAdmin:boolean,isOwner:boolean, payload: any) => {
  const isBugExists = await prisma.bugs.findUniqueOrThrow({
    where: {
      id: projectId,
    },
  });

  if (!isBugExists) {
    throw new Error('Bug Does not Exists');
  }
  if (!isAdmin) {
    throw new Error('Forbidden access');
  }

  if (!isOwner) {
    throw new Error('Forbidden access');
  }
  const result = await prisma.projects.update({
    where: {
      id: projectId,
    },
    data: {
      ...payload,
    },
  });

  return result;
};

const deleteBug = async (projectId: string, isAdmin: boolean, isOwner: boolean) => {
  const isBugExists = await prisma.bugs.findUniqueOrThrow({
    where: {
      id: projectId,
    },
  });

  if (!isBugExists) {
    throw new Error('Bug Does not Exists');
  }
  if (!isAdmin) {
    throw new Error('Forbidden access');
  }

  if (!isOwner) {
    throw new Error('Forbidden access');
  }
  const result = await prisma.projects.delete({
    where: {
      id: projectId,
    },
  });

  return result;
};

const closeBug = async (bugId: string, isAdmin: boolean, isOwner:boolean) => {
  const isBugExists = await prisma.bugs.findUniqueOrThrow({
    where: {
      id: bugId,
    },
  });

  if (!isBugExists) {
    throw new Error('Bug Does not Exists');
  }
  if (!isAdmin) {
    throw new Error('Forbidden access');
  }

  if (!isOwner) {
    throw new Error('Forbidden access');
  }
  const result = await prisma.bugs.update({
    where: {
      id: bugId,
    },
    data: {
      bug_status: 'Closed',
    },
  });

  return result;
};

export const bugService = {
  createBugIntoDb,
  updateBug,
  deleteBug,
  findAllBugsFromDb,
  findBugByProjectId,
  findAuthorBug,
  closeBug,
};
