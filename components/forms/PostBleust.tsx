
"use client"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { ChangeEvent, useState } from "react"
import { isBase64Image } from "@/lib/utils"
import { useUploadThing } from "@/lib/uploadthing"
import { UpdateUser } from "@/lib/actions/user.action"
import { usePathname, useRouter } from "next/navigation"
import { ThreadValidation } from "@/lib/validation/threads"
import { createThreads } from "@/lib/actions/Threads.action"

interface Props {
    user: {
        id: string;
        objectId: string;
        username: string;
        name: string;
        bio: string;
        image: string;
    };
    btnTitle: string
}


const PostBleust = ({ userId }: { userId: string }) => {
    const router = useRouter();
    const pathname = usePathname();

    const form = useForm({
        resolver: zodResolver(ThreadValidation),
        defaultValues: {
            threads: " ",
            accountId: userId,
        }
    })

    // const form = useForm<z.infer<typeof ThreadValidation>>({
    //     resolver: zodResolver(ThreadValidation),
    //     defaultValues: {
    //       threads: "",
    //       accountId: userId,
    //     },
    //   });

    const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
        await createThreads({
            text: values.threads,
            author: userId,
            communityId: null,
            path: pathname,
        });
        router.push("/")
    }

    return (

        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 per2 p-10 ">

                <FormField
                    control={form.control}
                    name="threads"
                    render={({ field }) => (
                        <FormItem className="flex flex-col justify-start gap-5 text-2xl font-semibold w-full">
                            Content

                            <FormControl className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 !important; text-base-semibold text-xl">
                                <Textarea
                                    rows={5}

                                    {...field}
                                />
                            </FormControl>

                        </FormItem>
                    )}
                />


                <Button type="submit" className="w-full bg-purple-500 hover:bg-red-500 ">Post</Button>
            </form>
        </Form>

    );
};

export default PostBleust;