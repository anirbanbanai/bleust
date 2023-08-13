"use client"
import React from 'react';
import { SidebarLinks } from "@/constants/index"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { SignOutButton, SignedIn } from '@clerk/nextjs';

const LeftSideBar = () => {
    const router = useRouter();
    const pathname = usePathname()
    return (
        <section className='text-black  gap-4 rounded-lg p-4 bg-slate-100 h-4/4 sticky left-0 top-0 z-20 flex h-screen w-fit flex-col justify-between overflow-auto border-r border-r-dark-4 bg-dark-2 pb-5 pt-28 max-md:hidden'>
            <div className='flex w-full flex-1 flex-col gap-6 px-6'>

                {SidebarLinks.map((link) => {
                    const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;
                    return (
                        <Link className={`relative flex justify-start items-center gap-4 rounded-lg p-4 ${isActive && "bg-red-500"}`} href={link.route} key={link.label}>
                            <Image src={link.imgURL} alt={link.label} width={24} height={24} />
                            <p className=' text-xl max-lg:hidden'>{link.label}</p>
                        </Link>
                    )
                })}
            </div>
            <div>
                <SignedIn>
                    <SignOutButton signOutCallback={() => router.push("/sign-in")}>
                        <div className="flex cursor-pointer items-center gap-4 p-4">
                         
                            <Image src="/assets/logout.svg" alt="LogOut" width={44} height={44} />
                         <p className=' text-xl max-lg:hidden'>Logout</p>
                        </div>
                    </SignOutButton>
                    {/* <SignInButton>
                        <Image src="/assets/login.svg" alt="Login" width={33} height={33}></Image>
                    </SignInButton> */}
                </SignedIn>
            </div>
        </section>
    );
};

export default LeftSideBar;