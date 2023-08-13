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
import { UserValidation } from "@/lib/validation/user";
import Image from "next/image"
import { ChangeEvent, useState } from "react"
import { isBase64Image } from "@/lib/utils"
import { useUploadThing } from "@/lib/uploadthing"
import { UpdateUser } from "@/lib/actions/user.action"
import { usePathname,useRouter } from "next/navigation"

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
const AccountProfile = ({ user, btnTitle }: Props) => {
  const [file, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing('media');
  const router=useRouter();
  const pathname=usePathname();

  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: user?.image || "",
      name: user?.name || "",
      username: user?.username || '',
      bio: user?.bio || ""
    }
  })



  const handleImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 1) {

      const file = e.target.files[0];

      setFiles(Array.from(e.target.files))

      if (!file.type.includes("image")) return;
      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl)
      }
      fileReader.readAsDataURL(file)
    }
  }

  const onSubmit = async(values: z.infer<typeof UserValidation>) => {

    const blob = values.profile_photo;

    const hasImageChanges = isBase64Image(blob);

    if (hasImageChanges) {
      const imgRes = await startUpload(file);

      if(imgRes && imgRes[0].fileUrl){
      values.profile_photo = imgRes[0].fileUrl;
      }
    }
    
     await UpdateUser({
      userId : user.id,
      username: values.username,
      name: values.name,
      bio:values.bio,
      image: values.profile_photo,
      path: pathname,
     }
     );
     if(pathname === "/profile/edit"){
      router.back();
     }else{
      router.push("/")
     }
  }
  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 per2 p-10 ">
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex items-center gap-5">
              <FormLabel className="bg-gray-700  p-10 rounded-full">
                {
                  field.value ? (
                    <Image
                      src={field.value}
                      alt="profile_photo"
                      width={96}
                      height={96}
                      priority
                      className="rounded-full" />
                  ) : (
                    <Image
                      src="/assets/profile.svg"
                      alt="profile_photo"
                      width={55}
                      height={55}

                      className="rounded-full" />
                  )
                }
              </FormLabel>

              <FormControl className="text-base-semibold text-gray-200">
                <Input
                  type="file"
                  accept="image/"
                  placeholder="Upload a photo"
                  className=""
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>

            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex items-center gap-5 w-full">
              <FormLabel className="text-xl font-semibold">
                Name
              </FormLabel>

              <FormControl className="text-base-semibold text-gray-200">
                <Input
                  type="text"
                  className="input"
                  {...field}
                />
              </FormControl>

            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex items-center gap-5 w-full">
              <FormLabel className="text-xl font-semibold">
                username
              </FormLabel>

              <FormControl className="text-base-semibold text-gray-200">
                <Input
                  type="text"
                  className="input"
                  {...field}
                />
              </FormControl>

            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex items-center gap-5 w-full">
              <FormLabel className="text-xl font-semibold">
                Bio
              </FormLabel>

              <FormControl className="text-base-semibold text-gray-200">
                <Textarea
                  rows={10}
                  className="input"
                  {...field}
                />
              </FormControl>

            </FormItem>
          )}
        />

        <Button type="submit" className="w-full hover:bg-red-500 ">Submit</Button>
      </form>
    </Form>
  );
};

export default AccountProfile;