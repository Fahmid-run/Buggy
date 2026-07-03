import { NextFunction, Request, Response, Router } from 'express';

import userController from '../user/user.controller';
import { jwtUtils } from '../../utils/jwt';

import { auth } from '../../middlewares/auth';
import { Role } from '../../../prisma/generated/prisma/enums';
import { projectController } from './project.controller';

const router = Router();

router.post('/projects', projectController.createProject);



router.get(
  '/projects',
  auth(Role.Admin, Role.User, Role.Author),
  projectController.findAllProjects,
);


router.get(
  '/projects/:id',
  auth(Role.Admin, Role.User, Role.Author),
  projectController.findProjectById,
);


router.get(
  '/projects/me',
  auth(Role.Admin, Role.User, Role.Author),
  projectController.findMyProject,
);



router.patch(
  '/projects/:id',
  auth(Role.Admin, Role.Author),
  projectController.updateProject,
);
router.delete(
  '/projects/:id',
  auth(Role.Admin, Role.Author),
  projectController.updateProject,
);



export const userRoutes = router;
