import React from 'react'
import { useState, useEffect } from 'react'
import Error from './Error'

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {

  const [nombre, setNombre] = useState('')
  const [propietario, setPropietario] = useState('')
  const [email, setEmail] = useState('')
  const [fecha, setFecha] = useState('')
  const [sintomas, setSintomas] = useState('')
  const [error, setError] = useState(false)
  //console.log(paciente)
  useEffect(() => {

    if (Object.keys(paciente).length > 0) {

      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)

    }

    //console.log(Object.keys(paciente))
  }, [paciente])

  const generarId = () => {
    const random = Math.random().toString(36).substr(2)
    const fecha = Date.now().toString(36)

    return random + fecha
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    //Validacion formulario

    if ([nombre, propietario, email, fecha, sintomas].includes('')) {
      console.log('Hay al menos un campo vacio')
      setError(true)
      return
    }

    setError(false)
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas
    }

    if (paciente.id) {
      //Editando el registro
      objetoPaciente.id = paciente.id


      const pacientesActualizado = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)

      setPacientes(pacientesActualizado)
setPaciente({})
    } else {
      // nuevo reguistro
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente])
    }


    // Reiniciar el form

    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
  }

  return (
    <div className='md:w-1/2 lg:w-3/5'>
      <h2 className='font-black text-3xl  text-center'>

        Seguimiento Pacientes</h2>
      <p className='text-lg mt-5 text-center mb-10 '>
        Añade tus pacientes y{''}
        <span className='text-indigo-600 font-bold'>Administralos</span>
      </p>

      <form onSubmit={handleSubmit} className='bg-white shadow-md rounded-lg py-10 px-5 mb-10'>

        {error && <Error><p>todos los campos son obligatorios</p></Error>}
        <div>
          <label htmlFor='mascota' className='block text-gray-700 uppercase font-bold' >
            Nombre Mascota</label>
          <input value={nombre} onChange={(e) => setNombre(e.target.value)} type='text' id='mascota' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' placeholder='Nombre de la mascota' />
        </div>

        <div className='mt-5'>
          <label htmlFor='propietario' className='block text-gray-700 uppercase font-bold' >
            Propietario</label>
          <input value={propietario} onChange={(e) => setPropietario(e.target.value)} type='text' id='propietario' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' placeholder='Nombre de la mascota' />
        </div>

        <div className='mt-5'>
          <label htmlFor='email' className='block text-gray-700 uppercase font-bold' >
            Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type='text' id='email' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' placeholder='Nombre de la mascota' />
        </div>
        <div className='mt-5'>
          <label htmlFor='alta' className='block text-gray-700 uppercase font-bold' >
            Alta</label>
          <input value={fecha} onChange={(e) => setFecha(e.target.value)} type='date' id='alta' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' />
        </div>
        <div className='mt-5'>
          <label htmlFor='sintomas' className='block text-gray-700 uppercase font-bold' >
            Sintomas</label>
          <textarea value={sintomas} onChange={(e) => setSintomas(e.target.value)} id='sintomas' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' placeholder='Describe los sintomas' />
        </div>

        <input type="submit" className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors ' value={paciente.id ? 'Editar paciente' : 'Agregar paciente'} />

      </form>
    </div>
  )
}

export default Formulario
