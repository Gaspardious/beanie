
import React from 'react'

const about = () => {
  return (
      <div className='w-full pb-10 bg-blue-50 relative '>
          <div className="relative h-[300px] w-full bg-cover bg-center bg-no-repeat bg-[url('/beanie.webp')]">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>
        <h1 className="text-3xl h-screen mt-5 sm:text-6xl font-extrabold text-white absolute top-20 left-1/2 transform -translate-x-1/2">About</h1>
       
        <div className="flex flex-col items-center justify-center text-center h-full gap-5"> 
          <h2 className='text-2xl text-black pt-10 font-bold'>About</h2>
          <p className='text-black w-3/4 sm:text-lg sm:w-2/4'>Beanie is a Swedish brand built by a solo developer (visit my portfolio <a href='https://gaspardev.com' className='text-orange-500 underline underline-offset-2'>here</a>) with a passion for simple design and practical style. What started as a fun side-project quickly grew into a real online store dedicated to one thing: <strong className='text-orange-500 uppercase underline underline-offset-2'>beanies</strong>. 
          <br /> <br />
          Every piece is carefully selected and made to bring warmth, comfort, and a touch of Scandinavian minimalism to everyday life.
          </p>

          <h2 className='text-2xl text-black font-bold'>Why choose us?</h2>
          <p className='text-black w-3/4 sm:text-lg sm:w-2/4 p-0 m-0'>We’re not a big fashion house — and that’s exactly the point. Beanie is run by one person who builds, designs, and curates everything with care. No middlemen, no unnecessary fluff, just high-quality beanies made to be worn and loved. Whether you’re braving a cold winter morning or just adding a finishing touch to your outfit, we’ve got you covered.
          </p>

          <h2 className='text-2xl text-black font-bold'>Our values</h2>
        
          <ul className='list-disc list-inside text-black text-left w-3/4 sm:text-lg sm:w-2/4'>
            <li>Simplicity – Clean Scandinavian design that always works.</li>
            <li>Quality – Only beanies that feel good, look good, and last.</li>
            <li>Authenticity – Built by one person, with passion, for the joy of creating.</li>
            <li>Fun – Beanie started as a playful idea and stays true to that spirit.</li>
          </ul>
         

        </div>
      </div>
  )
}

export default about