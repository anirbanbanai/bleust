import { formatDateString } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface Propss {
    id: string,
    currentUserId: string | undefined,
    parentId: string,
    text: string,
    author: {
        name: string,
        image: string,
        id: string
    },
    community: {
        id: string,
        name: string,
        image: string
    } | null,
    createAt: string,
    comments: {
        author: {
            image: string;
        }
    }[]
    isComment?: Boolean;
}

const BleustCard = ({
    id,
    currentUserId,
    parentId,
    text,
    author,
    community,
    createAt,
    comments,
    isComment
}: Propss) => {
    return (
        <article
            className={`flex w-full flex-col rounded-xl ${isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
                }`}
        >
            <div className=' bg-slate-300 p-5 pb-0 rounded-xl'>
                <div className='flex items-center'>
                    <Link href={`/profile/${author?.id}`} className='relative h-11 w-11'>
                        <Image
                            src={author?.image}
                            alt='user_community_image'
                            fill
                            className=' rounded-full'
                        />
                    </Link>

                    <Link href={`/profile/${author?.id}`} className='w-fit ml-5'>

                        <h4 className='text-2xl font-semibold '>
                            {author?.name}
                        </h4>
                    </Link>
                </div>
                <div className='flex w-full flex-1 flex-row gap-4'>

                    <div className='flex w-full flex-col p-4'>

                        <div className="postin  pt-2 p-5 pl-3 mt-2">
                            <p className='mt-2 text-small-regular text-light-2'>{text}</p>
                        </div>

                        <div className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}>

                            <div className='flex gap-3.5'>
                                <Image
                                    src='/assets/heart-gray.svg'
                                    alt='heart'
                                    width={34}
                                    height={24}
                                    className='cursor-pointer object-contain'
                                />
                                
                                <Link href={`/bleust/${id}`}>
                                    <Image
                                        src='/assets/reply.svg'
                                        alt='heart'
                                        width={34}
                                        height={24}
                                        className='cursor-pointer object-contain'
                                    />
                                </Link>
                                <Image
                                    src='/assets/repost.svg'
                                    alt='heart'
                                    width={34}
                                    height={24}
                                    className='cursor-pointer object-contain'
                                />
                                <Image
                                    src='/assets/share.svg'
                                    alt='heart'
                                    width={34}
                                    height={24}
                                    className='cursor-pointer object-contain'
                                />
                            </div>

                            {isComment && comments.length > 0 && (
                                <Link href={`/bleust/${id}`}>
                                    <p className='mt-1 text-subtle-medium text-gray-1'>
                                        {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                                    </p>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                {/* <DeleteThread
          threadId={JSON.stringify(id)}
          currentUserId={currentUserId}
          authorId={author.id}
          parentId={parentId}
          isComment={isComment}
        /> */}
            </div>

            {!isComment && comments.length > 0 && (
                <div className='ml-1 mt-3 flex items-center gap-2'>
                    {comments.slice(0, 2).map((comment, index) => (
                        <Image
                            key={index}
                            src={comment.author.image}
                            alt={`user_${index}`}
                            width={24}
                            height={24}
                            className={`${index !== 0 && "-ml-5"} rounded-full object-cover`}
                        />
                    ))}

                    <Link href={`/bleust/${id}`}>
                        <p className='mt-1 text-subtle-medium text-gray-1'>
                            {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                        </p>
                    </Link>
                </div>
            )}

            {!isComment && community && (
                <Link
                    href={`/communities/${community.id}`}
                    className='mt-5 flex items-center'
                >
                    <p className='text-subtle-medium text-gray-1'>
            {formatDateString(createAt)}
            {community && ` - ${community.name} Community`}
          </p>

                    <Image
                        src={community.image}
                        alt={community.name}
                        width={14}
                        height={14}
                        className='ml-1 rounded-full object-cover'
                    />
                </Link>
            )}
        </article>
    )

}

export default BleustCard