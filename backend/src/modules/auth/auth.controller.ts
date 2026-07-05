import { NextFunction, Request, Response, response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { authService } from './auth.service';
import sendResponse from '../../utils/sendResponse';
import httpstatus from 'http-status';

const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const { accessToken, refreshToken } = await authService.loginUSer(payload);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24,
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    sendResponse(res, {
      success: true,
      statusCode: httpstatus.OK,
      message: 'loggined Successfully',
      data: {
        accessToken,
        refreshToken,
      },
    });
  },
);

const refreshToken = catchAsync(async (req, res, next) => {
  const refresh_token = req.cookies.refreshToken;
  const accesstoken = await authService.refreshToken(refresh_token);

  res.cookie('accessToken', accesstoken, {
    httpOnly: true,
    secure: false,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpstatus.OK,
    message: 'Access token generated',
    data: {
      accesstoken,
    },
  });
});

export const authController = {
  loginUser,
  refreshToken,
};
