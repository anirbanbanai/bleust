import "../globals.css"
import ButtomBar from "@/components/shared/ButtomBar"
import LeftSideBar from "@/components/shared/LeftSideBar"
import RightSideBar from "@/components/shared/RightSideBar"
import Topbar from "@/components/shared/Topbar"
import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"

export const metadata = {
  title: "Threads",
  description: "A next.js 13 Meta Th application"
}

const inter = Inter({ subsets: ["latin"] })

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Topbar />

          <main className="flex flex-row">
            <LeftSideBar />

            <section className="flex min-h-screen flex-1 flex-col items-center bg-dark-1 px-6 pb-10 pt-28 max-md:pb-32 sm:px-10 ">
              <div className="w-full max-w-4xl">
                {children}
              </div>
            </section>
            {/* @ts-ignore */}
            <RightSideBar />
          </main>
          <ButtomBar />
        </body>
      </html>
    </ClerkProvider>
  )
}

export default RootLayout;