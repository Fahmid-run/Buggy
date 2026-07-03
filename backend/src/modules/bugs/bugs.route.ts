import { NextFunction, Request, Response, Router } from 'express';

import { auth } from '../../middlewares/auth';
import { Role } from '../../../prisma/generated/prisma/enums';
import { bugController } from './bugs.controller';

const router = Router();

router.post('/project/bugs/:id', bugController.createBug);


router.get('/project/bugs/:id', bugController.findBugByProjectId);


router.get('/project/bugs/me', bugController.findAuthorBug);


router.patch(
  '/project/bug/:id',
  auth(Role.Admin, Role.Author),
  bugController.updateBug,
);


router.delete(
  '/project/bug/:id',
  auth(Role.Admin, Role.Author),
  bugController.updateBug,
);

router.patch(
  '/project/bug/:id/close',
  auth(Role.Admin, Role.Author),  bugController.closeBug,
);




export const userRoutes = router;
