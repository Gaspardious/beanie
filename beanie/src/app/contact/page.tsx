
import React from 'react'
import Image from 'next/image'

const Contact = () => {
  return (
    <div className='w-full pb-10 bg-blue-50 relative '>
        <div className="relative h-[300px] w-full bg-cover bg-center bg-no-repeat bg-[url('/beanie.webp')]">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>


        <div className="flex flex-wrap md:flex md:flex-row justify-center items-center gap-5 md:gap-10 absolute top-60 w-full">
        <div className='relative flex flex-col items-center justify-center gap-5 shadow-xl bg-white w-36 h-30 rounded-lg sm:w-40 sm:h-32'>
          <Image src='/position.svg' alt='logo' width={25} height={25} className='absolute top-2 left-2' />
          <p className='text-black text-sm font-bold'>Adress:</p>
          <p className='text-black text-sm'>Allbyggsgatan 1</p>
        </div>
        <div className='relative flex flex-col items-center justify-center gap-5 shadow-xl bg-white w-36 h-30 rounded-lg sm:w-40 sm:h-32 '>
          <Image src='/phone.svg' alt='logo' width={25} height={25} className='absolute top-2 left-2' />
          <p className='text-black text-sm font-bold'>Telefon:</p>
          <p className='text-black text-sm'>07345 34 56</p>
        </div>
        <div className='relative flex flex-col items-center justify-center gap-5 shadow-xl bg-white w-36 h-30 rounded-lg sm:w-40 sm:h-32 '>
          <Image src='/email.svg' alt='logo' width={20} height={20} className='absolute top-2 left-2' />
          <p className='text-black text-sm font-bold'>Mail:</p>
          <p className='text-black text-sm'>allbygg@gmail.com</p>
        </div>
        <div className='relative flex flex-col items-center justify-center gap-5 shadow-xl bg-white w-36 h-30 rounded-lg sm:w-40 sm:h-32'>
          <Image src='/clock.svg' alt='logo' width={25} height={25} className='absolute top-2 left-2' />
          <p className='text-black text-sm font-bold'>Öppettider:</p>
          <p className='text-black text-sm text-center '>Vardag:  8:00 - 20:00</p>
        </div>
      </div>
      

      <h1 className="text-3xl mt-10 sm:text-6xl font-extrabold text-white absolute top-20 left-1/2 transform -translate-x-1/2">Contact</h1>
        <form className='mt-[200px] md:mt-[100px]' action="">
          <div className="flex flex-col items-center justify-center h-full gap-10">
            <p className="text-[#263e90] text-center p-5">Ring eller maila oss om du vill du ha offert eller rådgivning om vad som skulle passa dig och ditt projekt bäst. <br /> <br /> Använd gärna formuläret nedan så  svarar vi så fort vi kan.</p>
            <div className="flex flex-col items-center justify-center h-full gap-10">
              <input required type="text" placeholder="Namn*" className="w-80 h-10 text-black  bg-white placeholder:text-[#263e90] border-2 border-[#263e90] rounded pl-2"/>
              <input required type="email" placeholder="Email*" className="w-80 h-10 text-black   bg-white placeholder:text-[#263e90] border-2 border-[#263e90] rounded pl-2"/>
              <input required type="text" placeholder="Ämne*" className="w-80 h-10 text-black  bg-white placeholder:text-[#263e90] border-2 border-[#263e90] rounded pl-2"/>
              <textarea required minLength={50} name="message" id="message" cols={30} rows={10} placeholder="Meddelande*" className="w-80 h-40 text-black   bg-white placeholder:text-[#263e90] border-2 border-[#263e90] rounded pl-2"></textarea>
              <button className="bg-[#263e90] hover:bg-[#263e57] cursor-pointer text-white font-bold py-2 px-4 rounded w-31">Skicka</button>
            </div>
          </div>
          <h2 className="text-[#263e90] text-center mt-10 pb-5">Vill du nå oss på telefon istället?</h2>
          <p className="text-[#263e90] text-center"><strong>VD:</strong> Emin Kahirman </p>
          <p className="text-[#263e90] text-center"><strong>Telefon:</strong> +46 123 456 789</p>
        </form>
    </div>
  )
}

export default Contact