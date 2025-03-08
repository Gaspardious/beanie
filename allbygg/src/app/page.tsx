import Info from "../../components/Info/Info";


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="relative h-screen w-full bg-cover bg-center bg-no-repeat bg-[url('/renovation.jpg')]">
        <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
            <h1 className="text-2xl sm:text-4xl font-extralight text-white ">ALLBYGG TRESTAD AB</h1>
            <h2 className="text-4xl sm:text-5xl font-bold text-white m-10"> Vi är ett byggföretag som erbjuder tjänster inom bygg och renovering.</h2>
            <button className="bg-[#eeeeee] hover:scale-105 cursor-pointer text-[#263e90] font-bold py-2 px-4 rounded w-31 mr-10">Tjänster</button>
          </div>
        </div>
      <Info BigText="Dags att renovera?" SmallText="You a good boy now!" ImageSrc="/paint.jpg" BtnText="Kontakta oss"/>
      <Info BigText="Vi är ett steg bort!" SmallText="Svarar inom 24h!" ImageSrc="/drill.jpg" reverse/>
      <Info BigText="Dags att renovera?" SmallText="You a good boy now!" ImageSrc="/tools.jpg"/>
    </div>
  );
}
