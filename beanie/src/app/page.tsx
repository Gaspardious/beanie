import Info from "../../components/Info/Info";
import Link from "next/link";
import Reviews from "../../components/Reviews/Reviews";


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="relative h-[700px] w-full bg-cover bg-center bg-no-repeat bg-[url('/beanie.jpg')]">
        <div className="absolute inset-0 bg-black opacity-70"></div>
          <div className="relative flex flex-col items-center justify-center h-full text-center">
            <h1 className="text-2xl sm:text-3xl font-extralight text-white ">the fisherman beanie</h1>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mt-2 mx-15 mb-5">  a must have piece of every man! <br /> <br />🧔🏻‍♂️ 🧔🏼 🧔🏾 </h2>
           <Link href="/offer"> <button className="bg-[#eeeeee] hover:scale-105 cursor-pointer text-[#1c1c1c] font-bold py-2 px-4 mt-5 rounded w-31">Beanies!</button> </Link>
          </div>
        </div>
      <Info BigText="You know you want a beanie. Stop playin." SmallText="Get your beanie now!" ImageSrc="/beanie_red.jpg" BtnText="Beanies"/>
      <Info BigText="No matter profession. A beanie is needed." SmallText="Get one now!" BtnText="Go on now, get it!" ImageSrc="/beanie_red2.jpg" reverse/>
      <div className="flex flex-wrap justify-center gap-2">
      <Reviews customerNumber='Kund #56' customerName="Johnny B Carlsson" heading='Nöjd!!' text='Mitt badrum blev så himla fint. Jag är säg glad och lycklig!'  />
      <Reviews customerNumber='Kund #56' customerName="Johnny B Carlsson" heading='Nöjd!!' text='Mitt badrum blev så himla fint. Jag är säg glad och lycklig!'  />
      </div>


    </div>
  );
}
