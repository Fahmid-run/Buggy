
import bcrypt from 'bcrypt'


import configuration from '../../config';
import { RegisterUserPayload } from './user.inerface';
import { prisma } from '../../lib/prisma';


const registerUserIntoDb = async (payload: RegisterUserPayload) => {
  const { name, email, password,profile_photo } = payload;
  const isProfileExists = await prisma.user.findUnique({
    where: {
      email
    },
  });

  if (isProfileExists) {
    throw new Error('User already exists');
  }

  const hashedPwd = await bcrypt.hash(
    password,
    Number(configuration.BCRYPT_SALT_ROUNDS),
  );

  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPwd,
      profile_photo
    },
  });

 

  const user = await prisma.user.findUnique({
    where: {
      id: createdUser.id,
      email: createdUser.email || email,
    },
    omit: {
      password:true
    }
   
  });

  return user;
};


const getMyProfileFromDb = async (id:string) => {

  const user = await prisma.user.findUnique({
    where: {
      id
    },
    omit: {
      password:true
    }
  })
  

  return user;
}

const updateMyProfileInDb =  async(userId:string, payload:any) => {

  const {name,email, profile_photo,bio}= payload

  const updatedUSer = prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name, email,
      profile_photo
    }
    ,

    omit: {
      password:true
    }
  })

  return updatedUSer;
  
}

export const userService = {
  registerUserIntoDb,
  getMyProfileFromDb,
  updateMyProfileInDb,
};
