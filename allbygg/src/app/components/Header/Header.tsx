import Link from "next/link"


const Header = () => {
  return (
    <div className="bg-blue-500 h-30 flex flex-col items-center justify-center">
        <h1 className="text-white text-4xl font-bold m-3">Allbygg Trestad AB</h1>
        <p>You word is our law baby!</p> 

        <nav className="flex flex-row gap-10 m-3">
            <Link href="/">Hem</Link>
            <Link href="/about">Om oss</Link>
            <Link href="/services">Tjänster</Link>
            <Link href="/contact">Kontakt</Link>
            <Link href="/contact">Offert</Link>
        </nav>  

    </div>
  )
}

export default Header