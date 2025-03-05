'use client'
import Link from "next/link"
import Image from "next/image"

const Header = () => {



  return (
    <header className="bg-white h-28 flex flex-col items-center justify-center">

      <section className="flex flex-row items-start gap-20 justify-between w-full">
        <div className="flex flex-row items-center justify-center h-full gap-20">
          <Image src="/logo2.png" alt="logo" width={110} height={110}  />
          <nav className=" hidden lg:flex gap-10 text-[#263e57] font-bold text-[1.2rem]">
              <Link className="hover:text-[#4c6cd3]" href="/">HEM</Link>
              <Link className="hover:text-[#4c6cd3]" href="/about">OM OSS</Link>
              <Link className="hover:text-[#4c6cd3]" href="/services">TJÄNSTER</Link>
              <Link className="hover:text-[#4c6cd3]" href="/contact">KONTAKT</Link>
          </nav>
        </div>
        <div className="flex flex-row items-center justify-center h-full">
          <Link href="/contact"><button className=" hidden sm:bg-gray-500 hover:bg-[#263e90] cursor-pointer text-white font-bold py-2 px-4 rounded mr-10 sm:block ">E-handel</button></Link>
          <Link href="/contact"><button className=" bg-[#263e57] hover:bg-[#263e90] cursor-pointer text-white font-bold py-2 px-4 rounded w-31 mr-10">Begär offert</button></Link>
          <Image src="/menu.svg" alt="logo" width={25} height={25} className="mr-10 lg:hidden"/>

        </div>
      </section>

    </header>
  )
}

export default Header