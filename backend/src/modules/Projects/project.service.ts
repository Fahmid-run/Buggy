import { prisma } from "../../lib/prisma"

const createProjectIntoDb = async (id: string,payload:{name:string}) => {


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

  return result
  
}

const findMyProject = async (authorId: string) => {
  const result = await prisma.projects.findMany({
    where: {
      authorId,
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

const updateProject = async (projectId: string, payload: any) => {
  const isProjectExists = await prisma.projects.findUniqueOrThrow({
    where: {
      id:projectId
    }
  })


  if (!isProjectExists) {
    throw new Error("Project Doesnot Exists")
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

const deleteProject = async (projectId: string) => {
  const result = await prisma.projects.delete({
    where: {
      id:projectId
    },
  });

  return result;
};



export const projectService = {
  createProjectIntoDb,
  findMyProject,findAllProjectsFromDb,findProjectById,updateProject,deleteProject
};