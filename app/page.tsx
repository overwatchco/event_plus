import Image from "next/image";
import { Navbar } from "./components";
import Overwatch_logo from '../public/logo-o-horizontal-negativo.png';
import Logo_event from '../public/event+_horizontal_blanco.png';
import Link from "next/link";

export default function Home() {
  return ( 
    <main className="w-full h-screen flex flex-col justify-start items-center bg-[#10032F]  overflow-hidden overflow-y-auto">
      <Navbar/>
      <section className="w-full h-full bg-gradient-to-b bg-[#10032F] flex flex-col justify-center items-center px-4 xl:px-64 ">
        <div className="w-full h-auto md:w-auto md:h-[125px] px-4">
          <Image
            alt="Logo Event plus"
            src={Logo_event}
            width={Logo_event.width}
            height={Logo_event.height}
            className="w-full h-full object-cover"
            priority={true}
          />
        </div>
        <p className="sm:mt-8 mt-3 sm:px-44 text-white text-4xl text-center sm:text-6xl font-semibold tracking-tighter">
          Gestione sus <span className="underline leading-8 underline-offset-8 decoration-8 decoration-[#FFED0B]">Eventos</span> de Manera sencilla
        </p>
        <p className="sm:mt-8 mt-2.5 text-white sm:px-72 text-center text-sm sm:leading-loose md:text-lg font-normal tracking-tighter">
          Optimiza la gestión contractual de tus eventos logísticos con event+, Captura cada detalle visualmente con la capacidad de generar actas entregables en formatos personalizados. Simplifica el proceso de facturación y maximiza la eficiencia en la planificación de eventos con nuestra solución integral.
        </p>
        <div className="w-auto h-auto flex flex-col md:flex-row gap-3 pt-4 justify-center items-center">
          <Link href={`/`} className="w-[150px] h-auto text-center px-4 py-2 bg-[#7D2FD3] hover:bg-[#10032F] text-white hover:text-[#FFED08] hover:shadow hover:shadow-[#FFED08] transition duration-700 ease-in-out rounded-md ">
            Inicia ya!
          </Link>
          <Link href={`/contato`} className="w-[150px] h-auto text-center px-4 py-2 bg-[#7D2FD3] hover:bg-[#10032F] text-white hover:text-[#FFED08] hover:shadow hover:shadow-[#FFED08] transition duration-700 ease-in-out rounded-md ">
            Contactanos!
          </Link>
        </div>
      </section>
      <Link href={`https://overwatch.com.co`} target="blanck" className="fixed bottom-0 text-white w-full h-[35px] flex gap-3 justify-center items-center bg-[#10032F] ">
        <span>Creado con ❤ por: </span>
        <Image
          src = { Overwatch_logo }
          alt = " LogoOberwatchCompany "
          width = { Overwatch_logo.width }
          height = { Overwatch_logo.height } 
          className = " w-auto h-full object-cover "
        />
      </Link> 
    </main>
  )
}
