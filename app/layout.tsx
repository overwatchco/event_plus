import type { Metadata } from 'next'
import { Inter } from 'next/font/google' 
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Event +',
  description: 'Optimiza la gestión contractual de tus eventos logísticos con Event+. Organiza fácilmente contratos que contienen múltiples eventos, cada uno con sus propios requisitos detallados. Captura cada detalle visualmente con la capacidad de generar actas entregables en formatos personalizados. Simplifica el proceso de facturación y maximiza la eficiencia en la planificación de eventos con nuestra solución integral'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
