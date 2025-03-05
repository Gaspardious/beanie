import Image from "next/image";
import Info from "../../components/Info/Info";


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center relative">
      <h1 className="  text-6xl sm:text-9xl font-bold absolute top-60 left-10 text-white"> Välkommen!
      </h1>
        <Image src="/renovation.jpg" alt="logo" width={2000} height={2000} className="m-0 p-0"  />
        <Info BigText="Dags att renovera?" SmallText="You a good boy now!" ImageSrc="/renovation.jpg"/>
        <Info BigText="Vi är ett steg bort!" SmallText="Svarar inom 24h!" ImageSrc="/renovation.jpg" reverse/>
        <Info BigText="Dags att renovera?" SmallText="You a good boy now!" ImageSrc="/renovation.jpg"/>
    </div>
  );
}
