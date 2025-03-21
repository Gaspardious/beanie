import Info from "../../components/Info/Info";
import Link from "next/link";
import Reviews from "../../components/Reviews/Reviews";
import Image from 'next/image'
import Head from 'next/head';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <link rel="preload" as="image" href="/beanie.webp" type="image/webp" />
        </Head>

      <div className="relative h-[700px] w-full bg-cover">
        <Image 
          src="/beanie.webp" 
          alt="Hero Beanie" 
          width={1000} 
          height={700} 
          priority 
          className="object-cover w-full h-full"
        />

        <div className="absolute inset-0 bg-black opacity-60"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5">
          <h1 className="text-3xl sm:text-4xl font-light text-white">The Fisherman Beanie</h1>
          <h2 className="text-5xl sm:text-6xl font-bold text-white mt-2 mb-5">A Must-Have Piece for Every Man! <br /> <br />🧔🏻‍♂️ 🧔🏼 🧔🏾</h2>
          <Link href="/shop">
            <button className="bg-[#eeeeee] hover:scale-105 cursor-pointer text-[#1c1c1c] font-bold py-3 px-6 rounded-lg shadow-md">
              Get Your Beanie!
            </button>
          </Link>
        </div>
      </div>

      <Info BigText="You know you want a beanie. Stop playin." SmallText="Get your beanie now!" ImageSrc="/beanie_red.webp" BtnText="Beanies"/>
      <Info BigText="No matter the profession. A beanie is needed." SmallText="Get one now!" BtnText="Go on now, get it!" ImageSrc="/beanie_red2.webp" reverse/>

      <div className="flex flex-wrap justify-center gap-2">
        <Reviews customerNumber='Kund #56' customerName="Johnny B Carlsson" heading='Nöjd!!' text='Mitt badrum blev så himla fint. Jag är säg glad och lycklig!' />
        <Reviews customerNumber='Kund #56' customerName="Johnny B Carlsson" heading='Nöjd!!' text='Mitt badrum blev så himla fint. Jag är säg glad och lycklig!' />
      </div>
    </div>
  );
}