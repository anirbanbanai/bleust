"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";


import { createThread } from "@/lib/actions/Threads.action";
import { ThreadValidation } from "@/lib/validation/threads";


interface Props {
  userId: string;
}

function PostBleust({ userId }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const { organization } = useOrganization();

  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    await createThread({
      text: values.thread,
      author: userId,
      communityId: organization ? organization.id : null,
      path: pathname,
    });

    router.push("/");
  };

  return (
    <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 per2 p-10 ">

                <FormField
                    control={form.control}
                    name="thread"
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
}

export default PostBleust;
