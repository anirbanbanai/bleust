import { OrganizationSwitcher, SignIn, SignInButton, SignOutButton, SignedIn } from "@clerk/nextjs";
import Image from "next/image"
import Link from 'next/link'
import {dark} from "@clerk/themes"


const Topbar = () => {
  const isUserLogin = true;
  return (
    <nav className="bg-slate-700 p-5 fixed top-0 z-30 flex w-full items-center justify-between bg-dark-2 px-6 py-3">
      <Link href="/" className='flex items-center gap-5 '>
        <Image  src="/logo.svg" alt="logo" width={55} height={55} />
        <p className="text-white text-5xl font-semibold max-xs:hidden">Bleust</p>
      </Link>

   <div className="flex items-center gap-2">
    <div className="block md:hidden">
    <SignedIn>
            <SignOutButton>
              <div className='flex cursor-pointer'>
                <Image
                src="/assets/logout.svg"
                  alt='logout'
                  width={34}
                  height={24}
                />
             
              </div>
            </SignOutButton>
          </SignedIn>
    </div>
    <OrganizationSwitcher  appearance={{
      baseTheme:dark,
      elements:{
        organizationSwitcherTrigger:"py-2 px-4"
      }
    }}/>
   </div>
      
    </nav>
  );
};

export default Topbar;