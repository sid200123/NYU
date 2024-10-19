import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const SingleNote = () => {
  const note = useSelector((state) => state.note.note)

  return (
    <div className='flex w-full h-[100vh] justify-center bg-slate-200'>
    <div className='w-[50%] h-fit mt-14'>
      <div className='text-end'>
      <Link to="/">List Of Table</Link>

      </div>
    <h1 className='mb-5 font-bold text-2xl'>Single Note All Details</h1>
    <div className='flex flex-col gap-5'>
      <h1><span className='font-bold'> Title :- </span> {note?.title}</h1>
      <h1><span className='font-bold'> Author :- </span> {note?.author}</h1>
      <h1><span className='font-bold'> Description :- </span> {note?.description}</h1>
      <h1><span className='font-bold'> DateTime :- </span> {note?.dateTime}</h1>
      <h1><span className='font-bold'> Status :- </span> {note?.status ? "True" : "False"}</h1>
      <h1><span className='font-bold'> Expired :- </span> {note?.expired ? "True" : "False"}</h1>
    </div>
    </div>
  </div>
  )
}

export default SingleNote