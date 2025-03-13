'use client'
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import MobileMenu from "../MobileMenu/MobileMenu"
import Cart from "../Cart/Cart"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuCart, setCartOpen] = useState(false);
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
  className={`h-[95px] flex flex-col items-center justify-center sticky top-0 z-50  ${
    isScrolled && !menuOpen ? "bg-black/50 backdrop-blur-md" : "bg-white"
  }`}
>

      <section className="flex flex-row items-start gap-20 justify-between w-full">
        <div className="flex flex-row items-center justify-center h-full gap-20">
         <Link href="/">
           <Image src={isScrolled ? "/tiger_white.png" : "/tiger_black.png"} alt="logo" width={110} height={110} className=" ml-2 sm:ml-10" />
         </Link>

          <nav className={`hidden sm:flex gap-8 font-bold text-[1.2rem] ${
            isScrolled ? "text-white" : "text-[#1c1c1c]"
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
                className={`hover:text-[#ff8b07] transition-all duration-300 font-oswald ${
                  pathname === link.path ? "text-[#ff8b07]" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-row items-center justify-center h-full gap-0">    
          <Cart open={menuCart} setOpen={setCartOpen} />
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