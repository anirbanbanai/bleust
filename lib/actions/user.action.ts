"use server"

import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose"
import Community from "../models/community.models";
import User from "../models/user.models";

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
    path,}: ParamsProps):Promise<void> {


    try{
        connectToDB();
        
        await User.findOneAndUpdate(
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

export async function fetchUser(userId: string) {
    try {
      connectToDB();
  
      return await User.findOne({ id: userId }).populate({
        path: "communities",
        model: Community,
      });
    } catch (error: any) {
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
  }