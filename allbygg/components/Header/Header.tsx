'use client'
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"


const Header = () => {
const [isScrolled, setIsScrolled] = useState(false)
const pathname = usePathname()

useEffect(() => {
  const onScrolling = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  window.addEventListener("scroll", onScrolling);
  return () => window.removeEventListener("scroll", onScrolling);
}, []);

  return (
    <header 
      className={`h-[88px] flex flex-col items-center justify-center sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-black/50 backdrop-blur-md" : "bg-white"
    }`}>

      <section className="flex flex-row items-start gap-20 justify-between w-full">
        <div className="flex flex-row items-center justify-center h-full gap-20">
         <Link href="/"><Image src={isScrolled ? "/logo_light.png" : "/logo_dark.png"} alt="logo" width={90} height={90} className=" ml-2 sm:ml-10"  />
          </Link>

          <nav className={`hidden lg:flex gap-10 font-bold text-[1.2rem] transition-all duration-300 ${
            isScrolled ? "text-white" : "text-[#263e57]"
          }`}>
            {[
              { name: "HEM", path: "/" },
              { name: "OM OSS", path: "/about" },
              { name: "TJÄNSTER", path: "/offer" },
              { name: "INSPIRATION", path: "/inspiration" },
              { name: "KONTAKT", path: "/contact" },
            ].map((link) => (
              <Link 
                key={link.path} 
                href={link.path}
                className={`hover:text-[#4c6cd3] transition-all duration-300 ${
                  pathname === link.path ? "text-[#4c6cd3]" : ""
                }`}
              >
                {link.name}
              </Link>
              
            ))}
          </nav>
        </div>
        <div className="flex flex-row items-center justify-center h-full">
          <Link href="/contact"><button className=" hidden sm:bg-gray-500 hover:bg-[#263e90] cursor-pointer text-white font-bold py-2 px-4 rounded mr-10 sm:block ">E-handel</button></Link>
          <Link href="/contact"><button className=" bg-[#263e57] hover:bg-[#263e90] cursor-pointer text-white font-bold py-2 px-4 rounded w-31 mr-10">Begär offert</button></Link>
          
          
          <Image src={isScrolled ? "/menu_light.svg" : "/menu_dark.svg"} alt="logo" width={25} height={25}  className=" cursor=pointer mr-10 lg:hidden"/>
   
        </div>
      </section>
    </header>
  )
}

export default Header