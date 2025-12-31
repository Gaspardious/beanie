
import React from 'react'

const about = () => {
  return (
      <div className='w-full pb-10 bg-blue-50 relative '>
          <div className="relative h-[300px] w-full bg-cover bg-center bg-no-repeat bg-[url('/sarek.webp')]">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>
        <h1 className="text-3xl h-screen mt-5 sm:text-6xl font-extrabold text-white absolute top-20 left-1/2 transform -translate-x-1/2">About</h1>
       
        <div className="flex flex-col items-center justify-center text-center h-full gap-5"> 
          <h2 className='text-2xl text-black pt-10 font-bold'>About</h2>
          <p className='text-black w-3/4 sm:text-lg sm:w-2/4'>Beanie is a Swedish brand inspired by fishing trips, long hikes and cold days outdoors. The focus is simple: create clean, timeless beanies that are comfortable to wear and made to last.
          <br /> <br />
          Each piece is carefully selected with practicality in mind — warmth, fit and durability come first. No trends, no overcomplication. Just essentials designed for everyday use, whether you’re out early by the water, on the trail, or moving through the city.
          </p>

          <h2 className='text-2xl text-black font-bold'>Why choose us?</h2>
          <p className='text-black w-3/4 sm:text-lg sm:w-2/4 p-0 m-0'>We’re not a fashion brand chasing seasons or collections.
Beanie is built around a small, focused range of products, designed with intention and tested through real outdoor use.
          </p>

          <p className='text-black w-3/4 sm:text-lg sm:w-2/4 p-0 m-0'>No unnecessary layers, no excess — just well-made beanies created to be worn often and trusted in colder conditions.</p>

          <h2 className='text-2xl text-black font-bold'>Our values</h2>
        
          <ul className='list-disc list-inside text-black text-left w-3/4 sm:text-lg sm:w-2/4'>
            <li>Simplicity – Clean Scandinavian design that works in any setting.</li>
            <li>Quality – Materials and construction chosen for comfort, durability and warmth.</li>
            <li>Authenticity – Inspired by real time spent outdoors — not trends or marketing.</li>
            <li>Fun – Made for cold mornings, long days and changing conditions.</li>
          </ul>
         

        </div>
      </div>
  )
}

export default about