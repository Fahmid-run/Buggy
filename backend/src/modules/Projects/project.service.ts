import { prisma } from "../../lib/prisma"

const createProjectIntoDb = async (id: string,payload:any) => {


  const result = await prisma.projects.create({
    data: {
      ...payload,
      authorId:id
    },
  });


  return result
}

const findAllProjectsFromDb = async () => {
  const result = await prisma.projects.findMany({
    
  })

  return result
}

const findProjectById = async(projectId:string) => {
  const result = await prisma.projects.findUniqueOrThrow({
    where: {
      id: projectId,
    }
  });

  return result
  
}

const findMyProject = async (authorId: string) => {
  const result = await prisma.projects.findMany({
    where: {
      authorId:authorId
    },
    include: {
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

const updateProject = async (projectId: string,isAdmin:boolean,isOwner:boolean, payload: any) => {
  const isProjectExists = await prisma.projects.findUniqueOrThrow({
    where: {
      id:projectId
    }
  })


  if (!isProjectExists) {
    throw new Error("Project Doesnot Exists")
  }
  if (!isAdmin && !isOwner) {
    throw new Error("forbidden")
  }
  const result = await prisma.projects.update({
    where: {
      id:projectId
    },
    data: {
      ...payload
    }
  });

  return result;
};

const deleteProject = async (projectId: string, isAdmin: boolean, isOwner: boolean) => {
  const isProjectExists = await prisma.projects.findUniqueOrThrow({
    where: {
      id: projectId,
    },
  });

  if (!isProjectExists) {
    throw new Error('Project Doesnot Exists');
  }

  if (!isAdmin && !isOwner) {
    throw new Error('forbidden');
  }
  const result = await prisma.projects.delete({
    where: {
      id: projectId,
    },
  });

  return result;
};



export const projectService = {
  createProjectIntoDb,
  findMyProject,findAllProjectsFromDb,findProjectById,updateProject,deleteProject
};