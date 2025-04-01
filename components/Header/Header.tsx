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
  
  // Check if the current route is a product page
  const isProductPage = pathname.includes('/shop/') && pathname !== '/shop';
  
  useEffect(() => {
    const onScrolling = () => {
      setIsScrolled(window.scrollY > 10);
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

  if(pathname === "/checkout") {
    return <></>
  }
  
  // Header positioning and background classes
  let headerClasses = "h-[80px] fixed w-full flex items-center justify-between z-50 transition-all duration-300";
  
  // Apply different styles based on page type and scroll position
  if (isProductPage) {
    // Product page - always have a background
    headerClasses += isScrolled ? " top-0 bg-black" : " top-10 bg-black/70";
  } else {
    // Regular pages - transparent when at top
    headerClasses += isScrolled ? " top-0 bg-black/70 mt-0" : " top-10 bg-transparent mt-0";
  }
  
  return (
    <header className={headerClasses}>
      <div className="flex flex-row ml-5 lg:hidden">    
        <MobileMenu open={menuOpen} setOpen={setMenuOpen} />
      </div>

      <Link href="/">
        <div>
          <Image 
            src="/logo_white.png" 
            alt="logo" 
            width={65} 
            height={65} 
            className="cursor-pointer lg:ml-5"
          />
        </div>
      </Link>

      <nav className={`hidden sm:flex gap-8 font-bold text-[1.2rem] text-white`}>
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