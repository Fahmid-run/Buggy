import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpstatus from "http-status"
import { bugService } from "./bugs.service";
import { isBugOwner } from "../../utils/isOwner";

const createBug = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const authorId= req.user?.id as string
  const projectId = req.params.id as string

  const result = await bugService.createBugIntoDb(authorId,projectId, payload);
  sendResponse(res, {
    success: true,
    statusCode: httpstatus.CREATED,
    message: 'Bug Created  Successfully',
    data: result
  });
});

const findAllBugs = catchAsync(async (req: Request, res: Response) => {
  const result = await bugService.findAllBugsFromDb();

  sendResponse(res, {
    success: true,
    statusCode: httpstatus.CREATED,
    message: 'Bugs Retreieved  Successfully',
    data: result
  });
});

const findBugByProjectId = catchAsync(async (req: Request, res: Response) => {
  const projectId = req.params.id;

  const result = await bugService.findBugByProjectId(projectId as string);

  sendResponse(res, {
    success: true,
    statusCode: httpstatus.CREATED,
    message: 'Bugs Retreieved  Successfully',
    data: result
  });
});

const findAuthorBug = catchAsync(async (req: Request, res: Response) => {
  const id = req.user?.id;

  const result = await bugService.findAuthorBug(id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpstatus.CREATED,
    message: 'Bugs Retreieved  Successfully',
    data: result
  });
});

const updateBug = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const payload = req.body;
  const isAdmin = req.user?.role === "Admin"
    const isOwner = await isBugOwner(req.user, id);

  const result = await bugService.updateBug(id as string,isAdmin,isOwner, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpstatus.CREATED,
    message: 'Bugs Updated  Successfully',
    data:result
  });
});

const deleteBug = catchAsync(async (req: Request, res: Response) => {
  const id = req.params?.id as string;
  const isAdmin = req.user?.role === 'Admin';
    const isOwner = await isBugOwner(req.user, id);

  const result = await bugService.deleteBug(id as string,isAdmin,isOwner);

  sendResponse(res, {
    success: true,
    statusCode: httpstatus.CREATED,
    message: 'Bugs deleted  Successfully',
    data: {}
  });
});


const closeBug = catchAsync(async (req: Request, res: Response) => {

  const bugId = req.params.id as string
   const isAdmin = req.user?.role === 'Admin';
  const isOwner =await isBugOwner(req.user,bugId);

  const result = await bugService.closeBug(bugId,isAdmin,isOwner)

  sendResponse(res, {
    success: true,
    statusCode: httpstatus.CREATED,
    message: 'Bug closed',
    data: result
  });
})

export const bugController = {
  createBug,
  deleteBug,
  updateBug,
  findAllBugs,
  findBugByProjectId,
  findAuthorBug,
  closeBug,
};
