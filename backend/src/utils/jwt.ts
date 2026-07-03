import { JwtPayload, SignOptions } from "jsonwebtoken"
import jwt from "jsonwebtoken"
import configuration from "../config";
import { setDefaultCACertificates } from "node:tls";
const createToken = (payload: JwtPayload, secret: string,expiresIn:SignOptions
) => {
  const token = jwt.sign(payload, secret, {
    expiresIn
  } as SignOptions);


  return token
}


const verifyToken = (token: string, secret: string) => {
  
  try {
    const verifiedTokenPayload = jwt.verify(token, secret);

    return {
      success: true,
      data: verifiedTokenPayload,
    };
  } catch (error:any) {
    
    return {
      success: false,
      error: error.message
    }
  }

}


export const jwtUtils = {
  createToken,
  verifyToken
}
