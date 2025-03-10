
import React from 'react'

const Cookiespolicy = () => {
  return (
    <div className='w-full pb-10 bg-blue-50 relative '>
    <div className="relative h-[300px] w-full bg-cover bg-center bg-no-repeat bg-[url('/cookies.jpg')]">
    <div className="absolute inset-0 bg-black opacity-50"></div>
    </div>
  <h1 className="text-3xl h-screen mt-5 sm:text-6xl font-extrabold text-white absolute top-20 left-1/2 transform -translate-x-1/2">Cookies</h1>
  <p className="text-1xl w-5/6 sm:text-2xl text-center h-screen mt-15 sm:mt-20 font-extrabold text-white absolute top-30 left-1/2 transform -translate-x-1/2">Här kan du ta del om vilka cookies vi använder och hur vi hanterar dessa.</p>
       
 
  <div className="flex flex-col items-center justify-center h-full mt-5"> 
    <p className='text-black w-3/4 sm:text-lg sm:w-2/4'>
      Denna webbplats använder cookies. Vi använder enhetsidentifierare för att anpassa innehållet och annonserna till användarna, tillhandahålla funktioner för sociala medier och analysera vår trafik. Vi vidarebefordrar även sådana identifierare och annan information från din enhet till de sociala medier och annons- och analysföretag som vi samarbetar med. Dessa kan i sin tur kombinera informationen med annan information som du har tillhandahållit eller som de har samlat in när du har använt deras tjänster. <br /> <br />
      En cookie är en liten textfil som sparas i din webbläsare vid uppkoppling mot vår webbplats. Vissa cookies är nödvändiga för tillhandahållandet av webbplatsens funktion medan andra cookies syftar till att analysera hur webbplatsen används eller för att skapa en profil av dina intressen och visa relevanta annonser på andra webbplatser, dvs. i marknadsföringssyfte. <br /> <br />
      Vissa cookies, s.k. permanenta cookies, sparar en fil på din dator under en längre tid, cookien ha då ett förinställt datum och raderas automatiskt när datumet infaller, alternativt när du raderar cookien manuellt. Cookien lagrar information mellan webbsidebesök och gör bland annat att användarupplevelsen blir bättre, exempelvis genom att komma ihåg vilken ljudvolym som du har valt.<br /> <br />
      Andra cookies, s.k. sessionscookies, sparas temporärt på din dator och försvinner när du stänger webbläsaren. Utgångsdatum för cookien är beroende av när du stänger webbläsaren. Denna typ av cookie används bland annat för att hålla reda på vilket språk du har valt. <br /> <br />
      Ditt samtycke gäller för följande domäner: www.allbygg.se <br /> <br />
    </p>
  </div>
</div>
  )
}

export default Cookiespolicy