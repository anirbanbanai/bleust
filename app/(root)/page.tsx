import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import Pagination from "@/components/shared/Pagination";

import BleustCard from "@/components/card/PoastCard";
import { fetchUser } from "@/lib/actions/user.action";
import { fetchPosts } from "@/lib/actions/Threads.action";

async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchPosts(
    searchParams.page ? +searchParams.page : 1,
    30
  );

  return (
    <>
     
      <section className=' flex flex-col '>
        {result.posts.length === 0 ? (
          <p className='no-result'>No threads found</p>
        ) : (
          <>
            {result.posts.map((post) => (
              <BleustCard
              key={post._id}
              id={post._id}
              currentUserId={user.id}
              parentId={post.parentId}
              text={post.text}
              author={post.author}
              community={post.community}
              createAt={post.createdAt}
              comments={post.children}
            />
            ))}
          </>
        )}
      </section>

      <Pagination
        path='/'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </>
  );
}

export default Home;