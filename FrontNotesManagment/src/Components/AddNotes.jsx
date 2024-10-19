import axios from 'axios'
import React, { useState } from 'react'

const AddNotes = ({setShow}) => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [description, setDescription] = useState("")
    const [dateTime, setDateTime] = useState()
    const [status, setStatus] = useState(false)
    const [expired, setExpired] = useState(false)

    const addNote = async (e) => {
        e.preventDefault();

        const noteData = {
            title,
            author,
            dateTime,
            description,
            status,
            expired
        }

        axios.post("http://localhost:8080/note/addNote", noteData, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('note_token')}`,
            'Content-Type': 'application/json'
          }
        }).then((res) => {
            if(res.status === 201){
              setTitle("")
              setAuthor("")
              setDescription("")
              setDateTime()
              setExpired(false)
              setStatus(false) 
      
              setShow("List")
              alert(res.data.message)
            }
          })

        console.log(noteData)
    }
  return (
    <div className='flex w-full mt-8 justify-center bg-slate-200'>
      <div className='w-[50%] h-fit'>
      <h1 className='mb-5 font-bold text-2xl'>Add Note</h1>
        <form className='flex flex-col gap-4' onSubmit={addNote}>
        <label>
          Title:
          <input value={title} onChange={(e)=>{
            setTitle(e.target.value);
          }} type="text" className='border w-full px-2 py-1' />
        </label>
        <label>
          Author:
          <input value={author} onChange={(e)=>{
            setAuthor(e.target.value);
          }} type="text" className='border w-full px-2 py-1' />
        </label>
        <label>
          DateTime:
          <input value={dateTime} onChange={(e)=>{
            setDateTime(e.target.value);
          }} type="datetime-local" className='border w-full px-2 py-1' />
        </label>
        <label>
          Description:
          <input value={description} onChange={(e)=>{
            setDescription(e.target.value);
          }} type="text" className='border w-full px-2 py-1' />
        </label>
        <label className='flex items-center gap-2'>
          Status:
          <input checked={status} onChange={(e)=>{
            setStatus(e.target.checked);
          }} type="checkbox" className='border px-2 mt-1' />
        </label>
        <label className='flex items-center gap-2'>
          Expired:
          <input checked={expired} onChange={(e)=>{
            setExpired(e.target.checked);
          }} type="checkbox" className='borderpx-2 mt-1' />
        </label>
        <input type="submit" className='border border-blue-500 font-bold py-2 cursor-pointer rounded-sm mt-5 hover:text-white hover:bg-blue-500' value="Add Note" />
        </form>
      </div>
    </div>
  )
}

export default AddNotes