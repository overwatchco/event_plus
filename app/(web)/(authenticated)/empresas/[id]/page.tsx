'use client'

import { useParams } from 'next/navigation'
import React from 'react'

export default function EmpresaPage() {


    const params = useParams()



    return (
        <div>EmpresaPage  {params.id}</div>
    )
}
