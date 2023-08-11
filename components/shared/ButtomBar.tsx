'use client'
import React from 'react';
import { SidebarLinks } from "@/constants/index"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { SignOutButton, SignedIn } from '@clerk/nextjs';
const ButtomBar = () => {
    const router = useRouter();
    const pathname = usePathname()
    return (
        <section className='fixed bottom-0 z-10 w-full rounded-t-3xl bg-glassmorphism p-4 backdrop-blur-lg xs:px-7 md:hidden bg-slate-800'>
            <div className='flex items-center justify-between gap-3 xs:gap-5'>
                
            {SidebarLinks.map((link) => {
                    const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;
                    return (
                        <Link className={`relative flex justify-start gap-4 rounded-lg p-4 ${isActive && "bg-purple-500"}`} href={link.route} key={link.label}>
                            <Image src={link.imgURL} alt={link.label} width={24} height={24} />
                            <p className='text-white max-lg:hidden'>{link.label}</p>
                        </Link>
                    )
                })}
            </div>
        </section>
    );
};

export default ButtomBar;