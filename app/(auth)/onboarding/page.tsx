import AccountProfile from '@/components/forms/AccountProfile';
import { currentUser } from '@clerk/nextjs';
import React from 'react';

const PageOnBoard = async() => {
    const user = await currentUser();

    const userInfo={};

    const userData={
        id: user?.id,
        objectId: userInfo?.id,
        username: userInfo?.username || user?.username,
        name: userInfo?.name || user?.firstname || "",
        bio: userInfo?.bio || "",
        image: userInfo?.image || user?.imgUrl,
    }
    return (
        <main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
            <h1 className='head-text text-4xl font-bold'>Onboard</h1>
            <p className='mt-3 mb-5 text-3xl font-semibold'>
                Complate your profile Now
            </p>
            <section>
                <AccountProfile user={userData} btnTitle="continue"/>
            </section>
        </main>
    );
};

export default PageOnBoard;