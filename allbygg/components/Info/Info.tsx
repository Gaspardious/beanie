'use client'
import Image from 'next/image'
import React from 'react'

interface InfoProps {
  reverse?: boolean; 
  BigText: string;
  SmallText: string;
  ImageSrc: string;
}

const Info: React.FC<InfoProps> = ({ BigText, ImageSrc, SmallText, reverse = false })=> {
  return (
    <div className={`flex flex-row items-center justify-center w-full relative bg-white ${reverse ? 'flex-row-reverse' : 'flex-row'}`}>
        <section className=' h-full w-1/2 text-black'>
            <Image src={ImageSrc} alt="logo" width={1000} height={1000} className="object-cover w-full h-auto"/>
        </section>
          <section className='h-full w-1/2 text-black flex flex-col items-center justify-center text-center '>
              <h2 className='pb-10 text-2xl sm:text-4xl md:text-6xl lg:text-8xl'>{BigText}</h2>
              <p className=' text-1xl sm:text-2xl'>{SmallText}</p>
          </section>
    </div>
  )
}

export default Info