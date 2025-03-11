'use client'
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import MobileMenu from "../MobileMenu/MobileMenu"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

   useEffect(() => {
    const onScrolling = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", onScrolling);
    return () => window.removeEventListener("scroll", onScrolling);
  }, []); 

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [menuOpen]);

  return (
<header 
  className={`h-[100px] flex flex-col items-center justify-center sticky top-0 z-50 duration-100 ${
    isScrolled && !menuOpen ? "bg-black/50 backdrop-blur-md" : "bg-white"
  }`}
>

      <section className="flex flex-row items-start gap-20 justify-between w-full">
        <div className="flex flex-row items-center justify-center h-full gap-20">
         <Link href="/">
           <Image src={isScrolled ? "/tiger_white.png" : "/tiger_black.png"} alt="logo" width={100} height={90} className=" ml-2 sm:ml-10" />
         </Link>

          <nav className={`hidden lg:flex gap-10 font-bold text-[1.2rem] duration-100 ${
            isScrolled ? "text-white" : "text-[#574226]"
          }`}>
            {[
              { name: "HOME", path: "/" },
              { name: "SHOP", path: "/shop" },
              { name: "ABOUT", path: "/about" },
              { name: "CONTACT", path: "/contact" },
            ].map((link) => (
              <Link 
                key={link.path} 
                href={link.path}
                className={`hover:text-[#4c6cd3] transition-all duration-300 font-oswald ${
                  pathname === link.path ? "text-[#e68a00]" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-row items-center justify-center h-full gap-1">
          <MobileMenu open={menuOpen} setOpen={setMenuOpen} />
        </div>
      </section>
      {menuOpen && (
        <div 
          className="bg-black/40 fixed top-0 left-0 w-screen h-screen" 
          onClick={() => setMenuOpen(false)} 
        />
      )}
    </header>
  )
}

export default Header;