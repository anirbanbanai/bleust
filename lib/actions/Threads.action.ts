"use server"

import { revalidatePath } from "next/cache";
import User from "../models/user.models";
import { connectToDB } from "../mongoose";
import Thread from "../models/threads.model";

interface Paramss {
    text: String,
    author: String,
    communityId: String | null,
    path: any,
}

export async function createThreads({ text, author, communityId, path }: Paramss) {
    try {
        connectToDB();
        const createThreads = await Thread.create({
            text,
            author,
            community: null,

        });
        await User.findByIdAndUpdate(author, {
            $push: { Thread: createThreads._id }
        })
        revalidatePath(path)
    } catch (error: any) {
//    throw new Error(`Error creating bleust ${error}`)
    }
}

// export async function createThreads({ text, author, communityId, path }: Paramss
//     ) {
//       try {
//         connectToDB();
    
//         const communityIdObject = await Thread.findOne(
//           { id: communityId },
//           { _id: 1 }
//         );
    
//         const createdThread = await Thread.create({
//           text,
//           author,
//           community: communityIdObject, // Assign communityId if provided, or leave it null for personal account
//         });
    
//         // Update User model
//         await User.findByIdAndUpdate(author, {
//           $push: { threads: createdThread._id },
//         });
    
//         if (communityIdObject) {
//           // Update Community model
//           await Thread.findByIdAndUpdate(communityIdObject, {
//             $push: { threads: createdThread._id },
//           });
//         }
    
//         revalidatePath(path);
//       } catch (error: any) {
//         throw new Error(`Failed to create thread: ${error.message}`);
//       }
//     }
    