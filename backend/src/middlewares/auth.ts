import { NextFunction, Request, Response } from "express";
import { Role } from "../../generated/prisma/enums";
import catchAsync from "../utils/catchAsync";
import { jwtUtils } from "../utils/jwt";
import configuration from "../config";

import httpstatus from "http-status"
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../lib/prisma";
declare global {
  namespace Express {
    interface Request {
      user?: {
        name: string;
        email: string;
        id: string;
        role: Role;
      };
    }
  }
}

export const auth = (...requiredRoles: Role[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken
      ? req.cookies.accessToken
      : req.headers.authorization?.startsWith('Bearer')
        ? req.headers.authorization?.split(' ')[1]
        : req.headers.authorization;

    if (!token) {
      throw new Error(
        'You r not logged in. Please login to Acess this resource',
      );
    }

    const verifiedToken = jwtUtils.verifyToken(
      token,
      configuration.JWT_ACCESS_SECRET,
    );

    if (!verifiedToken.success) {
      throw new Error(verifiedToken.error);
    }

    const { email, name, id, role } = verifiedToken.data as JwtPayload;


    if (requiredRoles.length && !requiredRoles.includes(role)) {
      return res.status(httpstatus.FORBIDDEN).json({
        success: false,
        statusCode: httpstatus.FORBIDDEN,
        message: 'Forbidden Access',
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id,
        name,
        email,
        role,
      },
    });

    if (!user) {
      throw new Error('User Not Found');
    }

    if (user.active_status == 'Block') {
      throw new Error('Your Account Has been Blocked. Plz Contact Support');
    }

    req.user = {
      name,
      email,
      id,
      role,
    };

    next();
  });
};
