import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User } from '../model/user';

export const TokenAuthorization= async (req:Request, res:Response, next:NextFunction)=>{
    try{
        const token=req.headers.authorization;
        const key=process.env.JWT_SECRET_KEY;
        if(key && token){
            const auth=jwt.verify(token, key);
            if(typeof auth=== 'object' && 'email' in auth)
            {
                const email:string=auth.email;
                User.findUser(auth.email)
            }else throw new Error();
            
        }else throw new Error();
        
        


        
    }catch(err)
    {
        console.log(err);
    }
}

