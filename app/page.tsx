import Image from "next/image";
import { Navbar } from "./components";
import Logo_event from '../public/event+_horizontal_blanco.png';
import Link from "next/link";

export default function Home() {
  return ( 
    <main className="w-full h-screen flex flex-col justify-start items-center bg-[#10032F] overflow-hidden overflow-y-auto">
      <Navbar/>
      <section className="w-full pb-12 bg-gradient-to-b bg-[#10032F] ">
        <div className="items-center pt-12 px-8 mx-auto max-w-7xl lg:px-16 md:px-12">
          <div className="justify-center w-full text-center lg:p-10 max-auto">
            <div className="justify-center w-full mx-auto">
              <div className="flex flex-col items-center justify-center max-w-xl gap-3 mx-auto lg:flex-row">
                <Image
                  src={Logo_event}
                  width={Logo_event.width}
                  height={Logo_event.height}
                  alt="Logo de event +"
                  className="W-[150px] h-auto"
                />
              </div> 
              <p className="sm:mt-8 mt-3 sm:px-44 text-white text-4xl sm:text-6xl font-semibold tracking-tighter">
                Gestione sus <span className="underline leading-8 underline-offset-8	decoration-8 decoration-[#FFED0B]">Eventos</span> de Manera sencilla
              </p>
              <p className="sm:mt-8 mt-2.5 text-white sm:px-72  sm:leading-loose text-lg font-normal tracking-tighter">
                Optimiza la gestión contractual de tus eventos logísticos con Event+, Captura cada detalle visualmente con la capacidad de generar actas entregables en formatos personalizados. Simplifica el proceso de facturación y maximiza la eficiencia en la planificación de eventos con nuestra solución integral.
              </p>
            </div>
          </div> 
        </div>
        <div className="text-center space-x-4 mt-6">
          <Link href={`/sing-in`} className="bg-[#7D2FD3] hover:bg-[#10032F] translate-y-1 text-white hover:text-[#FFED0B] shadow hover:shadow-[#ffed08] transition duration-700 ease-in-out sm:text-lg text-xs font-bold py-2.5 px-6  rounded-full inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clip-rule="evenodd" />
            </svg>
            &nbsp; &nbsp;<span> Iniciar Secion </span>
          </Link>
        </div>
      </section> 
    </main>
  )
}
