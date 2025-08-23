'use client'
import React, { useState, useEffect } from 'react'

const Banner = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div 
      className={`bg-black h-10 w-full text-white flex items-center justify-center text-[10px] md:text-xs fixed top-0 left-0 transition-transform duration-300 z-[49] ${
        isVisible ? 'translate-y-0' : 'translate-y-[-100%]'
      }`}
    >
      <p>  
        <span className='mr-4'>✔ Free shipping over 999 kr</span>
        <span className='mr-4'>✔ Free returns</span>
        <span className='mr-4'>✔ 1–3 day delivery</span>
      </p>
    </div>
  )
}

export default Banner