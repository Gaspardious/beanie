import Link from "next/link"
import Image from "next/image"


const Footer = () => {
    return (
      <div className="w-full px-1 py-1 bg-[#263e57] sm:px-12 border-t-3 border-white" >
         
         <section className="flex flex-col items-center justify-center m-8">
            <div className="flex gap-4 justify-center sm:justify-start">
                  <Image src="/facebook.svg" alt="logo" width={30} height={30}  />
                  <Image src="/instagram.svg" alt="logo" width={30} height={30}  />
              </div>
          </section>
          
          <hr className="border-white border-opacity-50 w-4/5 mx-auto mt-0 mb-10"/>

        <div className=" flex flex-wrap items-start mt-10 justify-center gap-11 sm:gap-50">
          <section>
            <h2 className="text-white text-2xl font-bold mb-10">Om oss</h2>
            <div className="max-w-[200px] sm:max-w-none mx-auto sm:mx-0">
              <p className="text-white text-sm w-48">Vi är ett byggföretag som erbjuder tjänster inom bygg och renovering.</p>
            </div>
          </section>

          <section>
            <h2 className="text-white text-2xl font-bold mb-10">Kontakta oss</h2>
            <div className="max-w-[200px] sm:max-w-none mx-auto sm:mx-0">
                <p className="text-white text-sm"><strong>Adress:</strong> 123 45 Stockholm</p>
                <p className="text-white text-sm"><strong>Telefon:</strong> +46 123 456 789</p>
              </div>
          </section>


          <section className="mt-10 sm:mt-0">
            <h2 className="text-white text-2xl font-bold mb-10">Navigation</h2>
            <nav className="flex gap-4 justify-center sm:justify-start flex-col">
                <Link className="hover:text-[#4c6cd3] active:text-[#4c6cd3]" href="/">HEM</Link>
                <Link className="hover:text-[#4c6cd3]" href="/about">OM OSS</Link>
                <Link className="hover:text-[#4c6cd3]" href="/offer">TJÄNSTER</Link>
                <Link className="hover:text-[#4c6cd3]" href="/contact">KONTAKT</Link>
            </nav>
          </section>
        </div>

        <hr className="border-white border-opacity-50 w-4/5 mx-auto mt-10 mb-10"/>

        <div className="flex flex-row items-center justify-center gap-1">
         <Image src="/logo_light.png" alt="logo" width={70} height={70}  />
          <section>
            <p className="text-white text-sm">© 2025 Allbygg Trestad AB </p>
            <p className="text-white text-sm">All rights reserved </p>
          </section>
        </div>

        <div className=" flex flex-col items-center justify-center pb-3 pt-10  text-white text-center">
          <p className="text-sm mt-2 flex flex-wrap items-center justify-center gap-1">
            Gillar du hemsidan? Skaffa en egen! →
            <Link href="/admin" className="text-[#7fc7ff] hover:underline">
              www.gaspar.com
            </Link>
          </p>
        </div>
      </div>
    )
  }
  
  export default Footer