import { Request, Response, NextFunction } from "express";
import { User } from "../model/user";
import jwt from 'jsonwebtoken';
import { hash , compare} from "bcrypt";

async function generateToken(email:string) {
    try{
        if(process.env.JWT_SECRET_KEY)
        {
            return jwt.sign({email:email}, process.env.JWT_SECRET_KEY);
        }
        else throw new Error('invalid jwt');
    }catch(err)
    {
        console.log(err);
    }
}

export const signup= async (req:Request, res:Response, next:NextFunction)=>{
    try
    {
        const {name, email, password, number}=req.body;
        const activeUser=User.findUser(email);
        if(activeUser!== null)
        {
            res.status(400).json({msg:'user already exist'});
        }   
         hash(password, 10, async(err, hash)=>{
            if(err)
            {
                res.status(500).json({message:'internal server error'});
            }else{
                const user=new User(name, email, hash , number);
                user.save();
                res.status(200).json(user);
            }
         })
    }catch(err)
    {
        console.log(err);
    }
}

export const login= async (req:Request, res:Response, next:NextFunction)=>{
    try
    {
        const { email , password}= req.body;
        User.findUser(email)
        .then(user =>{
            if(user.password)
            {
                const comparePassword=compare(password, user.password)
                .then(x =>
                {
                    if(x == true)
                    {
                        const token=generateToken(email);
                        res.status(200).json({user, token});
                    }
                    
                });
            }
                
        })   
    }catch(err)
    {
        console.log(err);
    }
}

