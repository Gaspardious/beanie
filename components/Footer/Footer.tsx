import Link from "next/link"
import Image from "next/image"


const Footer = () => {
    return (
      <div className="w-full px-1 py-1 bg-[#1c1c1c] sm:px-12 border-t-1 border-gray-700" >
         
         <section className="flex flex-col items-center justify-center m-8">
            <div className="flex gap-4 justify-center sm:justify-start">
                  <Image src="/facebook.svg" alt="logo" width={30} height={30}  />
                  <Image src="/instagram.svg" alt="logo" width={30} height={30}  />
              </div>
          </section>
          
          <hr className="border-white border-opacity-50 w-4/5 mx-auto mt-0 mb-10"/>

        <div className=" flex flex-wrap items-start mt-10 justify-center gap-5 sm:gap-40">
          <section>
            <h2 className="text-white text-2xl font-bold mb-5">ABOUT</h2>
            <div className="flex flex-col gap-2 max-w-[200px] sm:max-w-none mx-auto sm:mx-0">
              <p className="text-white text-sm w-48 pb-3">Lorem ipsum, dolor sit amet consectetur adipisicing elit. </p>
              <Link className="hover:text-[#4c6cd3]" href="/integritetspolicy">- Integrity</Link>
              <Link className="hover:text-[#4c6cd3]" href="/cookiespolicy"> - Cookies</Link>
            </div>
          </section>

          <section>
            <h2 className="text-white text-2xl font-bold mb-5">CONTACT</h2>
            <div className="max-w-[200px] sm:max-w-none mx-auto sm:mx-0">
                <p className="text-white text-sm"><strong>Adress:</strong> 123 45 Stockholm</p>
                <p className="text-white text-sm"><strong>Telefon:</strong> +46 123 456 789</p>
              </div>
          </section>

          <section className=" hidden mt-10 sm:mt-0 sm:block">
            <h2 className="text-white text-2xl font-bold mb-5">MENU</h2>
            <nav className="flex gap-2 justify-center sm:justify-start flex-col">
                <Link className="hover:text-[#4c6cd3] active:text-[#4c6cd3]" href="/">HOME</Link>
                <Link className="hover:text-[#4c6cd3]" href="/about">ABOUT</Link>
                <Link className="hover:text-[#4c6cd3]" href="/shop">SHOP</Link>
                <Link className="hover:text-[#4c6cd3]" href="/contact">CONTACT</Link>
            </nav>
          </section>
        </div>

        <hr className="border-white border-opacity-50 w-4/5 mx-auto mt-10 mb-10"/>

        <div className="flex flex-row items-center justify-center gap-3">
         <Image src="/logo_white.png" alt="logo" width={80} height={80}  />
          <section>
            <p className="text-white text-sm">© 2025 Gaspar Invest AB </p>
            <p className="text-white text-sm">All rights reserved </p>
            <p className="text-white text-sm">Org.nr 123456789 </p>
          </section>
        </div>

        <div className=" flex flex-col items-center justify-center pb-3 pt-10  text-white text-center">
          <p className="text-sm mt-2 flex flex-wrap items-center justify-center gap-1">
            Like this website? Get in touch →
          <Link href="https://www.gaspardev.com" className="text-[#ff8b07] hover:underline">
            www.gaspardev.com
          </Link>
          </p>
        </div>
      </div>
    )
  }
  
  export default Footer