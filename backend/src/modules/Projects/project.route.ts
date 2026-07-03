import { NextFunction, Request, Response, Router } from 'express';

import userController from '../user/user.controller';
import { jwtUtils } from '../../utils/jwt';

import { auth } from '../../middlewares/auth';
import { Role } from '../../../prisma/generated/prisma/enums';
import { projectController } from './project.controller';

const router = Router();

router.post(
  '/',
  auth(Role.Admin, Role.User, Role.Author),
  projectController.createProject,
);



router.get(
  '/',
  auth(Role.Admin, Role.User, Role.Author),
  projectController.findAllProjects,
);


router.get(
  '/:id',
  auth(Role.Admin, Role.User, Role.Author),
  projectController.findProjectById,
);


router.get(
  '/project/me',
  auth(Role.Admin, Role.User, Role.Author),
  projectController.findMyProject,
);



router.patch(
  '/:id',
  auth(Role.Admin, Role.Author,Role.User),
  projectController.updateProject,
);
router.delete(
  '/:id',
  auth(Role.Admin, Role.Author,Role.User),
  projectController.deleteProject,
);



export const projectRoutes = router;
