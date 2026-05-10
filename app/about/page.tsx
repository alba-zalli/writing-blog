"use client";
import Link from "next/link";
import Image from "next/image";
import Search from "@/components/Search";


 export default function HomePage() {
  return (
    
    <main className="relative min-h-screen overflow-hidden bg-indigo-200 text-gray-900 relative">

        <section className="mx-auto max-w-4xl px-6 py-16">
        
        {/* NAV */}
        <div className="flex justify-between py-2 relative z-10 relative z-10 text-black">
          <Link href="/">
            <h2 className="text-2xl px-2 py-1 hover:underline">Home</h2>
          </Link>
          <Link href="/about">
            <h2 className="text-2xl px-2 py-1 hover:underline">About</h2>
          </Link>
          <Link href="/guestbook">
          <h2 className="text-2xl px-2 py-1 hover:underline">Guestbook</h2>
          </Link>

          <div className="w-64"> <Search onSearch={(value) => {window.location.href = `/?search=${value}`;}}/> </div>
        </div>


            <div className="mt-6 relative">

            <h1 className="mb-8 text-8xl">
                About me
            </h1>

            <div className="flex flex-col md:flex-row items-start gap-8">

            <div className="flex-1">

                <p className="text-dg">
                Hi, I&apos;m Alba Zalli. I&apos;m a second year Computer Science student at the University of Waterloo. I&apos;ve
                had my articles published in the Wellington Advertiser and UWaterloo&apos;s MathNews.
                This site is a compilation of my written work. I hope to become a published author one day.
                <br />
                <br />
                I am interested in writing about music, tech, the contours of transgender identity, and how all these things intersect.
                I also like writing about other things but I can&apos;t think of them right now.
                </p>
            </div>

            <Image
            src="/IMG_20260208_000250837.jpg"
            width={350}
            height={350}
            className="border-4 border-blue-700 w-full max-w-sm md:w-auto md:order-2"
            alt="Alba is sitting on his dorm bed, in the middle of a movement. The camera flash gives him a surprised expression."
            />

            
            </div>
            </div>

            <Image
                src="/stars-big.png"
                width={500}
                height={600}
                alt="a stars design"
                className="translate-x-6/7 overflow-hidden absolute right-0 top-0 pointer-events-none z-0 origin-left animate-blink hidden xl:block
                scale-x-[-1]"
            />

        </section>

        </main>
  );
}