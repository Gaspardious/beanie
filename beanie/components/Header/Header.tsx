'use client'
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import MobileMenu from "../MobileMenu/MobileMenu"
import Cart from "../Cart/Cart"
import { useProduct } from "../../src/app/context/ProductContext"


const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { menuCart, setCartOpen } = useProduct();
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
  className={`h-[95px] flex items-center sticky top-0 z-50  ${
    isScrolled && !menuOpen ? "bg-black/50 backdrop-blur-md" : "bg-white"
  }`}
>

      <section className="flex flex-row items-center justify-between w-full">

        <div className="flex flex-row items-center justify-center h-full ml-5">    
          <MobileMenu open={menuOpen} setOpen={setMenuOpen} />
        </div>

        <Link href="/">
        <div className="relative w-[85px] h-[90px]">
  <Image 
    src="/logo_black.png" 
    alt="logo" 
    width={85} 
    height={90} 
    className={`absolute transition-opacity duration-1000 ease-in-out ${isScrolled ? "opacity-0" : "opacity-100"}`}
  />
  <Image 
    src="/logo_white.png" 
    alt="logo" 
    width={85} 
    height={90} 
    className={`absolute transition-opacity duration-1000 ease-in-out ${isScrolled ? "opacity-100" : "opacity-0"}`}
  />
</div>
         </Link>

          <nav className={`hidden sm:flex gap-8 font-bold text-[1.2rem] ${
            isScrolled ? "text-white" : "text-[#1c1c1c]"
          }`}>
            {[
              { name: "HOME", path: "/" },
              { name: "SHOP", path: "/shop" },
              { name: "CHECKOUT", path: "/checkout" },
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



        <div className="flex flex-row items-center justify-center h-full gap-0">    
          <Cart open={menuCart} setOpen={setCartOpen} />
        </div>
      </section>


      {(menuOpen || menuCart) && (
        <div 
          className="bg-black/50 fixed top-0 left-0 w-screen h-screen" 
          onClick={() => {
            setMenuOpen(false);
            setCartOpen(false);
          }} 
        />
      )}
    </header>
  )
}

export default Header;