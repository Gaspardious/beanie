
const Shop = () => {
  return (
    <div className='w-full pb-10 bg-blue-50 relative '>
        <div className="relative h-[300px] w-full bg-cover bg-center bg-no-repeat bg-[url('/tools.jpg')]">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
      <h1 className="text-4xl mt-10 sm:text-6xl font-extrabold text-white absolute top-20 left-1/2 transform -translate-x-1/2">Shop</h1>
        <form action="">
          <div className="flex flex-col items-center justify-center h-full gap-10">
            <p className="text-[#263e90] text-center p-5">Vår webbshop är under konstruktion 👷🏼 <br /> <br /> Tveka inte att kontakta oss om du har frågor eller vill beställa något.</p>
            <div className="flex flex-col items-center justify-center h-full gap-10">
              <input required type="text" placeholder="Namn*" className="w-80 h-10 text-black  bg-white placeholder:text-[#263e90] border-2 border-[#263e90] rounded pl-2"/>
              <input required type="email" placeholder="Email*" className="w-80 h-10 text-black  bg-white placeholder:text-[#263e90] border-2 border-[#263e90] rounded pl-2"/>
              <input required type="text" placeholder="Ämne*" className="w-80 h-10 text-black  bg-white placeholder:text-[#263e90] border-2 border-[#263e90] rounded pl-2"/>
              <textarea required minLength={50} name="message" id="message" cols={30} rows={10} placeholder="Meddelande*" className="w-80 h-40 text-black bg-white placeholder:text-[#263e90] border-2 border-[#263e90] rounded pl-2"></textarea>
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

export default Shop