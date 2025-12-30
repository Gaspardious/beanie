
import React from 'react'

const Youtube = () => {



  return (
    <div className="flex flex-col items-center justify-center w-full py-10 bg-[linear-gradient(90deg,#282828_0%,#0f0b0b_100%)] ">
        <h2 className="text-7xl font-oswald mt-10 mb-2 bg-gradient-to-r from-orange-300 via-orange-500 to-orange-700 
           bg-clip-text text-transparent inline-block text-center">YOUTUBE</h2>
           <p className="text-2xl font-nunito text-center mb-5">Check out my latest videos!</p>
           <p className="text-1xl font-nunito text-center px-5">I do videos about coding, fishing, hiking and more...</p>

        <div className="flex flex-col items-center justify-center">
            <div className="w-full h-full mt-10 mb-10 flex flex-row gap-5 justify-center items-center flex-wrap lg:flex-nowrap px-5 lg:px-0 ">
                <iframe 
                    src="https://www.youtube.com/embed/oxQwk9_4sM8?si=0gsjKDZgo1JqHpZq"
                    title="YouTube video player" 
                    className="rounded-lg shadow-2xl"
                    width="380"
                    height="215"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    >

                    </iframe>

                    <iframe 
                    src="https://www.youtube.com/embed/Mhsj5z7OfY8?si=lXYw-fXiW4Ri1_6q"
                    title="YouTube video player" 
                    className="rounded-lg shadow-2xl"
                    width="380"
                    height="215"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    >

                    </iframe>

                    <iframe 
                    src="https://www.youtube.com/embed/1744lvXaMS4?si=40nqQcElw5b7sr-F"
                    title="YouTube video player" 
                    className="rounded-lg shadow-2xl"
                    width="380"
                    height="215"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    >

                    </iframe>
            </div>


            <p>Visit my <span className='text-orange-400 font-bold'>
                YouTube-Channel!</span></p>


    

        </div>
    </div>
  )
}

export default Youtube