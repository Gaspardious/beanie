
import React from 'react'
import Info from '../../../components/Info/Info'

const Offer = () => {
  return (
    <div className='w-full relative '>
      <div className="relative h-[300px] w-full bg-cover bg-center bg-no-repeat bg-[url('/bath.jpg')]">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        <section className=" bg-white flex flex-col items-center justify-center h-full text-center">
            <h1 className="text-sm sm:text-2xl font-extralight pt-10 text-gray-600 ">ALLBYGG TRESTAD AB</h1>
            <h2 className="text-2xl sm:text-3xl p-10 font-bold text-gray-600 m-10 w-full sm:w-"> Vi erbjuder tjänster inom bygg och renovering.
              Vi har lång erfarenhet och kan hjälpa dig med allt från badrum, köksrenovering, altan, garage till nybyggnation av hus. <br /> <br /> 
              Kontakta oss för ett förtsta - förutsättningslöst - möte. 👷🏻
            </h2>
        </section>

        <h1 className="text-3xl h-screen mt-5 sm:text-6xl font-extrabold text-white absolute top-20 left-1/2 transform -translate-x-1/2">Tjänster</h1>
        <div className='w-full p-5 sm:p-20 bg-blue-50 relative '>
        <Info BigText="Badrum" SmallText="
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Repellendus beatae ad error repellat," 
        ImageSrc="/paint.jpg" BtnText="Kontakta oss"/>
        <Info BigText="Ny altan?" SmallText="
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Repellendus beatae asperiore, ad error repellat," 
        reverse ImageSrc="/paint.jpg" BtnText="Kontakta oss"/>
        <Info BigText="Dags att renovera?" SmallText="
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Repellendus beatae asperiores a, ad error repellat." 
        ImageSrc="/paint.jpg" BtnText="Kontakta oss"/>
        <Info BigText="Vi kan bygga!" reverse SmallText="
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        , ratione ipsam ex, ad error repellat," 
        ImageSrc="/paint.jpg" BtnText="Kontakta oss"/>
      </div>
    </div>
  )
}

export default Offer