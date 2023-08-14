
import PostBleust from "@/components/forms/PostBleust";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Createpost = async () => {
    const user = await currentUser();
    if (!user) {
        return null;
    }
    const userInfo = await fetchUser(user.id);
    console.log(userInfo);
    if (userInfo?.onboarded) {
        redirect("/onboarding")
    }
    return (
        <div className="">
            <h2 className='text-3xl font-bold text-center mb-5'>CreatePost</h2>
            <PostBleust userId={userInfo.id} />
        </div>
    );
};

export default Createpost;