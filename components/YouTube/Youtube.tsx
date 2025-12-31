
import Link from 'next/link'
import React from 'react'

const Youtube = () => {



  return (
    <div className="flex flex-col items-center justify-center w-full py-10 bg-[linear-gradient(90deg,#282828_0%,#0f0b0b_100%)] ">
        <h2 className="text-7xl font-oswald mt-10 mb-5 bg-gradient-to-r from-orange-300 via-orange-500 to-orange-700 
           bg-clip-text text-transparent inline-block text-center">Adventures, Unfiltered</h2>
           <p className="text-2xl font-nunito text-center mb-5">Multi-day hikes, fishing trips and remote places — filmed as they actually are.</p>

        <div className="flex flex-col items-center justify-center">


            <div className="w-full h-full mt-10 mb-10 flex flex-row gap-5 justify-center items-center flex-wrap lg:flex-nowrap px-5 lg:px-0 ">

              <div className='bg-black p-2 rounded-lg shadow-2xl flex flex-col justify-center items-center'>
                <iframe 
                    src="https://www.youtube.com/embed/oxQwk9_4sM8?si=0gsjKDZgo1JqHpZq"
                    title="YouTube video player" 
                    className="rounded-lg shadow-2xl flex"
                    width="380"
                    height="215"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    >

                    </iframe>

                  <div className='mt-2 px-1 w-full'>
                    <h3 className='text-white font-bold mt-2'>Ultimate Hiking Adventure in Sarek! 🏔️ 🥾</h3>
                  </div>

              </div>

              <div className='bg-black p-2 rounded-lg shadow-2xl flex flex-col justify-center items-center'>
                    <iframe 
                    src="https://www.youtube.com/embed/Mhsj5z7OfY8?si=lXYw-fXiW4Ri1_6q"
                    title="YouTube video player" 
                    className="rounded-lg shadow-2xl"
                    width="380"
                    height="215"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    >

                    </iframe>

                               <div className='mt-2 px-1 w-full'>
                    <h3 className='text-white font-bold mt-2'>Catching 5 Cod in Lysekil, Sweden! 🎣</h3>
                  </div>

               </div>     

                <div className='bg-black p-2 rounded-lg shadow-2xl flex flex-col justify-center items-center'>

                    <iframe 
                    src="https://www.youtube.com/embed/1744lvXaMS4?si=40nqQcElw5b7sr-F"
                    title="YouTube video player" 
                    className="rounded-lg shadow-2xl"
                    width="380"
                    height="215"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    >

                    </iframe>


                               <div className='mt-2 px-1 w-full'>
                    <h3 className='text-white font-bold mt-2'>Midsummer fishing in Sweden! ☀️ 🎣</h3>
                  </div>

                </div>
            </div>


            <p>Visit my
              <Link href="https://www.youtube.com/@gaspardious" target="_blank" rel="noopener noreferrer" className='text-orange-500 font-bold'> YouTube Channel

  </Link>!</p>


    

        </div>
    </div>
  )
}

export default Youtube