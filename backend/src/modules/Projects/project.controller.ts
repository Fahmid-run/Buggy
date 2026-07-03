import { Request, request, Response } from "express"
import catchAsync from "../../utils/catchAsync"

import httpstatus from "http-status"
import sendResponse from "../../utils/sendResponse";


import { projectService } from "./project.service";
import { isProjectOwner } from "../../utils/isOwner";
import { isatty } from "node:tty";



const createProject = catchAsync(async (req: Request, res: Response) => {
  
  const payload = req.body;
  const id = req.user?.id as string
  const result= await projectService.createProjectIntoDb(id,payload)
   sendResponse(res, {
     success: true,
     statusCode: httpstatus.CREATED,
     message: 'Project Created  Successfully',
     data: {
       result
     },
   });
})

const findAllProjects = catchAsync(
  async (req: Request, res: Response) => {


  const result = await projectService.findAllProjectsFromDb();

  
    sendResponse(res, {
      success: true,
      statusCode: httpstatus.CREATED,
      message: 'Project Retreieved  Successfully',
      data: {
        result,
      },
    });
  },
);





const findProjectById = catchAsync(async (req: Request, res: Response) => {

  const projectId = req.params.id;

  const result = await projectService.findProjectById(projectId as string);

  sendResponse(res, {
    success: true,
    statusCode: httpstatus.CREATED,
    message: 'Project Retreieved  Successfully',
    data: {
      result,
    },
  });
});

const findMyProject = catchAsync(async (req: Request, res: Response) => {
  const id = req.user?.id;

  const result = await projectService.findMyProject(id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpstatus.CREATED,
    message: 'Project Retreieved  Successfully',
    data: {
      result,
    },
  });
});




const updateProject = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string
  const payload = req.body
  
   const isAdmin = req.user?.role === 'Admin';
   const isOwner = await isProjectOwner(req.user, id);

  const result = await projectService.updateProject(id as string,isAdmin,isOwner,payload);

  sendResponse(res, {
    success: true,
    statusCode: httpstatus.CREATED,
    message: 'Project Updated  Successfully',
    data: {
      result,
    },
  });
});


const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const id = req.params?.id as string
  const isAdmin= req.user?.role==="Admin"
  const isOwner =await isProjectOwner(req.user,id)

  const result = await projectService.deleteProject(
    id as string,
    isAdmin,
    isOwner,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpstatus.CREATED,
    message: 'Project deleted  Successfully',
    data: {
      result,
    },
  });
});



export const projectController = {
  createProject,
  findAllProjects,
  findProjectById,
  deleteProject,
  findMyProject,
  updateProject,
};