import { Request, Response } from "express";
import { MiddlewareFn } from "type-graphql";
import { Context } from "./Context";
import { verify } from "jsonwebtoken";


export const sigup = async(red:Request, res:Response)=>{
    //
}

export const Auth: MiddlewareFn<Context> =({context},next) =>{
    const authorization = context.req.headers['authorization'];

    if(!authorization) throw new Error("Not authorization");

    try{
        const token = authorization.split(" ",)[1];
        const payload = verify(token,"SecretKey");
        console.log(payload);
        context.payload = payload as any;
    }catch(e){
        console.log(e);
        throw new Error("Not authorization, Error: "+e+"",);
    }
    

    return next();
};