import Info from "../../components/Info/Info";
import Link from "next/link";
import Reviews from "../../components/Reviews/Reviews";
import Image from 'next/image'
import Head from 'next/head';
import Youtube from "../../components/YouTube/Youtube";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <Head>
        <link rel="preload" as="image" href="/beanie.webp" type="image/webp" />
        </Head>

      <div className="relative h-[700px] w-full bg-cover">

        <Image 
          src="/sarek.webp" 
          alt="Hero Beanie" 
          width={1000} 
          height={700} 
          priority 
          className="object-cover w-full h-full object-center"
        />

        <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className="absolute inset-0 bottom-0 flex flex-col items-start justify-end  px-5 pb-5 lg:px-10 lg:pb-10">
          <h1 className="text-2xl sm:text-3xl font-light text-white uppercase">The Sailor Beanie</h1>
          <h2 className="text-5xl sm:text-6xl font-bold text-white mt-2 mb-5">A Must-Have Piece for Every Man!</h2>
          <Link href="/shop">
            <button className="bg-orange-500 hover:scale-105 hover:bg-orange-600 cursor-pointer text-[#1c1c1c] font-bold py-3 px-6 rounded-lg shadow-md">
              Get Your Beanie →
            </button>
          </Link>
        </div>
      </div>
      <Youtube />

      <Info BigText="The Classic Beanie" SmallText="The classic beanie is a timeless and classic accessory that never goes out of style." positionImage="object-cover" paddingImage="p-1" ImageSrc="/images/beanie_black.jpg" BtnText="Beanies →"/>
      <Info BigText="The Golden Beanie" SmallText="Bold and chic, the golden beanie is the perfect accessory for any occasion." positionImage="object-contain" BtnText="Beanies →" ImageSrc="/images/beanie_gold.png" paddingImage="p-10" reverse/>

      <div className="flex flex-wrap justify-center gap-2">
        <Reviews customerNumber='Customer #56' customerName="Pierre" heading='5 out of 5' text='Just a great beanie' />
        <Reviews customerNumber='Customer #37' customerName="Johan" heading='Slick beanie!' text='As a göteborgare... i löv it!' />
        <Reviews customerNumber='Customer #14' customerName="Khalif" heading='Love it!' text='Clean design, good quality.' />
      </div>
    </div>
  );
}