import configuration from '../../config';
import { prisma } from '../../lib/prisma';

import bcrypt from 'bcrypt';

import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { jwtUtils } from '../../utils/jwt';
import { ILoginUSer } from './auth.interface.';

const loginUSer = async (payload: ILoginUSer) => {
  const { email, password } = payload;

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email,
    },
  });

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new Error('Password Not Matched');
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  
  const accessToken = jwtUtils.createToken(
    jwtPayload,
    configuration.JWT_ACCESS_SECRET,
    configuration.JWT_ACCESS_EXPIRES_IN as SignOptions,
  );

  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    configuration.JWT_REFRESH_SECRET,
    configuration.JWT_REFRESH_EXPIRES_IN as SignOptions,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (refreshToken: string) => {
  const jwtVerify = jwtUtils.verifyToken(
    refreshToken,
    configuration.JWT_REFRESH_SECRET,
  );

  if (!jwtVerify.success) {
    throw new Error(jwtVerify.error);
  }

  const { id } = jwtVerify.data as JwtPayload;

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });

  if (user.active_status === 'Blocked') {
    throw new Error('User is blocked');
  }

  const jwtPayload = {
    id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const generated_accessToken = jwtUtils.createToken(
    jwtPayload,
    configuration.JWT_ACCESS_SECRET,
    configuration.JWT_ACCESS_EXPIRES_IN as SignOptions,
  );

  return { generated_accessToken };
};

export const authService = {
  loginUSer,
  refreshToken,
};
