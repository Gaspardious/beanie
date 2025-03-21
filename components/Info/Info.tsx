'use client'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

interface InfoProps {
  reverse?: boolean; 
  BigText: string;
  SmallText: string;
  ImageSrc: string;
  BtnText?: string;
  paddingImage?: string;
}

const Info: React.FC<InfoProps> = ({ BigText, ImageSrc, BtnText, paddingImage, SmallText, reverse = false })=> {
  return (
    <div className={`flex flex-row items-center justify-center pt-1 px-1 w-full relative  ${reverse ? 'flex-row-reverse' : 'flex-row'}`}>
        
        <section className={`w-1/2 bg-gradient-to-r from-[#424242] to-[#0f0b0b] ${reverse ? 'ml-1' : 'mr-1'}`}>
            <Image src={ImageSrc} alt="logo" loading="lazy" width={1000} height={1000} className={`object-cover w-full h-[250px] sm:h-[700px] ${paddingImage} `}/>
        </section>


          <section className={`w-1/2 text-black bg-white flex flex-col text-center min-h-[250px] sm:min-h-[700px] justify-center items-center  `}> 
              <h2 className='pb-10 px-1 text-2xl sm:text-4xl md:text-6xl lg:text-8xl'>{BigText}</h2>
              <p className=' text-sm px-1 sm:text-2xl'>{SmallText}</p>
              {BtnText && ( 
              <Link href="/shop">
                <button className="bg-[#1c1c1c] hover:bg-orange-600 hover:scale-105  hover:text-black cursor-pointer text-white font-bold py-2 px-4 rounded w-auto mt-10">
                  {BtnText}
                </button>
              </Link>
            )}
          </section>
   
    </div>
  )
}

export default Info