
import { ProyectoContext } from '@/context/ProyectoProvider'
import React, { useContext } from 'react'

const useProyecto = () => {
  return useContext(ProyectoContext)
}

export default useProyecto