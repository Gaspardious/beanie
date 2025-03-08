import Info from '../../../components/Info/Info'
import Reviews from '../../../components/Reviews/Reviews'


const inspiration = () => {
  return (
    <div className='w-full relative '>
      <div className="relative h-[300px] w-full bg-cover bg-center bg-no-repeat bg-[url('/plan.jpg')]">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        <section className=" bg-white flex flex-col items-center justify-center py-10 text-center">
            <h1 className="text-sm sm:text-2xl font-extralight text-gray-600 ">Låt dig inspireras!</h1>
            <h2 className="text-2xl sm:text-3xl p-5 font-bold text-gray-600 w-full sm:w-[70%]"> Nedan hittar du inspiration för ditt nästa projekt. Vi byggt och renoverat allt från badrum till altaner hos 
              mängder av nöjda kunder. Kontakta oss för att få hjälp med ditt projekt!
            </h2>
        </section>

        <h1 className="text-4xl h-screen mt-5 sm:text-6xl font-extrabold text-white absolute top-20 left-1/2 transform -translate-x-1/2">Inspiration</h1>
        <div className='w-full p-5 sm:p-20 bg-blue-50 relative '>
        <Info BigText="Badrum" SmallText="
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Repellendus beatae ad error repellat," 
        ImageSrc="/paint.jpg" />
        <Info BigText="Ny altan?" SmallText="
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Repellendus beatae asperiore, ad error repellat," 
        reverse ImageSrc="/paint.jpg" />


      <div className='flex flex-wrap justify-center gap-0 sm:gap-10'>
        <Reviews customerNumber='Kund #56' customerName="Johnny B Carlsson" heading='Nöjd!!' text='Mitt badrum blev så himla fint. Jag är så glad och lycklig!'  />
        <Reviews customerNumber='Kund #56' customerName="Johnny B Carlsson" heading='Nöjd!!' text='Mitt badrum blev så himla fint. Jag är så glad och lycklig!'  />
      </div>


        <Info BigText="Dags att renovera?" SmallText="
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Repellendus beatae asperiores a, ad error repellat." 
        ImageSrc="/paint.jpg" />
        <Info BigText="Vi kan bygga!" reverse SmallText="
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        , ratione ipsam ex, ad error repellat," 
        ImageSrc="/paint.jpg"/>



<div className='flex flex-wrap justify-center gap-0 sm:gap-10'>
        <Reviews customerNumber='Kund #56' customerName="Johnny B Carlsson" heading='Nöjd!!' text='Mitt badrum blev så himla fint. Jag är så glad och lycklig!'  />
        <Reviews customerNumber='Kund #56' customerName="Johnny B Carlsson" heading='Nöjd!!' text='Mitt badrum blev så himla fint. Jag är så glad och lycklig!'  />
      </div>

      </div>


    </div>
  )
}

export default inspiration