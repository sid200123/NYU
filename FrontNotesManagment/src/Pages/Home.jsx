import { useState } from 'react'
import NoteListTable from '../Components/NoteListTable'
import AddNotes from '../Components/AddNotes'
import EditNotes from '../Components/EditNotes'
import axios from 'axios'

const Home = () => {
  const [show, setShow] = useState("List")
  const [updateNote, setUpdateNote] = useState({})

  const exportNote = () => {
    
    axios.post("http://localhost:8080/note/export", {},{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('note_token')}`,
        'Content-Type': 'application/json'
      }
    }).then((res) => {
        if(res.status === 201){
          console.log(res)
        }
      })
  }
  return (
    <div className='flex w-full h-[100vh] justify-center bg-slate-200'>
        <div className='w-[80%] h-fit mt-8'>
          {show === "List" && <div className='w-full text-end'>
            <button className='px-4 rounded text-blue-800' onClick={() => {
              setShow("Add")
            }}>Add Note</button>
          </div>}

          <div className='w-[100%] h-fit mt-8 text-end'>
            <button className='px-4 rounded text-blue-800' onClick={exportNote}>Export Note</button>
          </div>

          {(show === "Add" || show === "Edit")&& <div className='w-full text-end'>
            <button className='px-4 rounded text-blue-800' onClick={() => {
              setShow("List")
            }}>Show Notes</button>
          </div>}

          {show === "Edit" && <EditNotes setShow={setShow} updateNote={updateNote} />}
          {show === "Add" && <AddNotes setShow={setShow} />}
          {show === "List" && <NoteListTable setShow={setShow} setUpdateNote={setUpdateNote} />}
        </div>
    </div>
  )
}

export default Home