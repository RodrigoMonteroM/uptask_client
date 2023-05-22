import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className='px-4 py-5 bg-white border-b'>
      <div className='md:flex md:justify-between'>
        <h2 className='text-4xl font-black text-center text-sky-500'>Uptask</h2>
        <input className='rounded-lg lg:w-96 block p-2 border' type="search" name="" id="" placeholder='Buscar Proyecto' />
        <div className='flex items-center gap-4'>
          <Link href={"/proyectos"} className='hover:text-sky-600 transition-colors'>Proyectos</Link>
          <button className='text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold' type='button'>Cerrar Cesion</button>
        </div>
      </div>

    </header>
  )
}

export default Header