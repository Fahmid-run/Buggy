import {
  NextFunction,
  Request,
  Response,
} from 'express';
import httpstatus from 'http-status';
import { userService } from './user.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import jwt from 'jsonwebtoken';
import configuration from '../../config';
import { jwtUtils } from '../../utils/jwt';


const registerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const user = await userService.registerUserIntoDb(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpstatus.CREATED,
      message: 'user registered successfully',
      data:user
    });
  },
);










const getMyProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;

    
    const profile = await userService.getMyProfileFromDb(user?.id as string);


    sendResponse(res, {
      success: true,
      statusCode: httpstatus.OK,
      message: "Success",
      data: {
        // profile
      }
    })
  },
);

const updateMyProfile = catchAsync(async(req, res,next) => {


  const userId= req.user?.id as string

  const payload = req.body;

  const update = await userService.updateMyProfileInDb(userId, payload)

  console.log(update)
  const { id, name, email, role } = update;
  req.user = {
    id,
    name,
    email,
    role
  };
  

  sendResponse(res, {
    success: true,
    statusCode: httpstatus.OK,
    message: 'Success',
    data: {
      update,
    },
  });



  
})

const userController = {
  registerUser,
  getMyProfile,
  updateMyProfile,
};

export default userController;
