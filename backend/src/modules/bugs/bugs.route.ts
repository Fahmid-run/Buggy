import { NextFunction, Request, Response, Router } from 'express';

import { auth } from '../../middlewares/auth';
import { Role } from '../../../prisma/generated/prisma/enums';
import { bugController } from './bugs.controller';

const router = Router();

router.post('/:id', bugController.createBug);


router.get('/:id', bugController.findBugByProjectId);


router.get('/me', bugController.findAuthorBug);


router.patch(
  '/:id',
  auth(Role.Admin, Role.Author),
  bugController.updateBug,
);


router.delete(
  '/:id',
  auth(Role.Admin, Role.Author),
  bugController.updateBug,
);

router.patch(
  '/:id/close',
  auth(Role.Admin, Role.Author),  bugController.closeBug,
);




export const bugRoutes = router;
