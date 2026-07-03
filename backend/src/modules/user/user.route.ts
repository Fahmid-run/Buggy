import { NextFunction, Request, Response, Router } from 'express';

import userController from '../user/user.controller';
import { jwtUtils } from '../../utils/jwt';

import { auth } from '../../middlewares/auth';
import { Role } from '../../../prisma/generated/prisma/enums';


const router = Router();




router.post('/register', userController.registerUser);

router.get(
  '/me',auth(Role.Admin,Role.User,Role.Author),
  userController.getMyProfile,
);


router.put("/my-profile", auth(Role.Admin, Role.Author, Role.User), userController.updateMyProfile)


export const userRoutes = router;
