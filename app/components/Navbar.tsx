import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import Logo_event from '../../public/event+_horizontal_blanco.png';

export const Navbar = () =>  {
  return (
    <nav className="flex justify-between bg-[#10032F] text-white w-screen">
        <div className="px-5 xl:px-12 py-6 flex w-full items-center">
            
            <Link href='/' className=" text-3xl font-bold font-heading" >
                <Image
                    src={Logo_event}
                    alt='Logo event plus'
                    width={Logo_event.width}
                    height={Logo_event.height}
                    className='h-[20px] w-auto'
                />
            </Link>
            
            <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                <li>
                    <Link href='/' className="hover:text-gray-200">Inicio</Link>
                </li>
                <li>
                    <Link href='https://overwatch.com.co' target='blanck' className="hover:text-gray-200">Quienes Somos?</Link>
                </li>
                <li>
                    <Link href='/download' className="hover:text-gray-200">Descarga Nuestra App</Link>
                </li>
                <li>
                    <Link href='/contactos' className="hover:text-gray-200">Contactanos</Link>
                </li>
            </ul>
            
            <div className="hidden xl:flex space-x-5 items-center">
                <a className="flex items-center hover:text-gray-200" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </a>             
            </div>
        </div>
         
        <a className="navbar-burger self-center mr-12 xl:hidden" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </a>
    </nav>
  )
}
