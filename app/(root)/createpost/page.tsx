import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";


import { fetchUser } from "@/lib/actions/user.action";
import PostBleust from "@/components/forms/PostBleust";


async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <>
      <h1 className='text-4xl font-semibold text-center mb-5'>Create Post</h1>

      <PostBleust userId={userInfo._id} />
    </>
  );
}

export default Page;