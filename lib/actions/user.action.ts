"use server"

import { revalidatePath } from "next/cache";
import user from "../models/user.models";
import { connectToDB } from "../mongoose"

interface ParamsProps{
    userId : String,
    username: String,
    name: String,
    bio: String,
    image: String,
    path: any,
}

export async function UpdateUser(
   { userId,
    username,
    name,
    bio,
    image,
    path,}: ParamsProps
):Promise<void> {


    try{
        connectToDB();
        
        await user.findOneAndUpdate(
            {id: userId},
            {
                username: username.toLowerCase(),
                name,
                bio,
                image,
                onboareded: true,
            },
            {upsert: true}
        );
    
        if(path === "/profile/edit"){
            revalidatePath(path);
        }
    }
    catch(error: any){
        throw new Error(`failed to create/update user : ${error.message}`)
    }
}