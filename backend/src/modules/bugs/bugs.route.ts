import { NextFunction, Request, Response, Router } from 'express';

import { auth } from '../../middlewares/auth';
import { Role } from '../../../prisma/generated/prisma/enums';
import { bugController } from './bugs.controller';

const router = Router();

  
router.post(
  '/:id',
  auth(Role.Admin, Role.Author, Role.User),
  bugController.createBug,
);


router.get(
  '/:id',
  auth(Role.Admin, Role.Author, Role.User),
  bugController.findBugByProjectId,
);


router.get(
  '/bug/me',
  auth(Role.Admin, Role.Author, Role.User),
  bugController.findAuthorBug,
);


router.patch(
  '/:id',
  auth(Role.Admin, Role.Author,Role.User),
  bugController.updateBug,
);


router.delete(
  '/:id',
  auth(Role.Admin, Role.Author,Role.User),
  bugController.deleteBug,
);

router.patch(
  '/:id/close',
  auth(Role.Admin, Role.Author,Role.User),  bugController.closeBug,
);




export const bugRoutes = router;
