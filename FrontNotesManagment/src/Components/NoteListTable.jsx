import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNote } from "../Redux/noteAction"
import { useNavigate } from 'react-router-dom'

const NoteListTable = ({setShow, setUpdateNote}) => {
    const [notesList, setNotesList] = useState([])
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [showPrev, setShowPrev] = useState(false)
    const [showNext, setShowNext] = useState(false)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    function getNotesList(){
        axios.post("http://localhost:8080/note/getNote",{
            page,
            limit
        },{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('note_token')}`,
                'Content-Type': 'application/json'
            },
          }).then((res) => {
            setNotesList(res.data.notes)
            setShowPrev(res.data.prev)
            setShowNext(res.data.next)
        })
    }

    const deleteNote = (e, note) => {
        e.preventDefault()

        console.log(note)

        axios.delete(`http://localhost:8080/note/deleteNote/${note}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('note_token')}`,
              'Content-Type': 'application/json'
            }
          }).then((res) => {
            console.log(res.data)
            getNotesList()
        })
    }

    useEffect(()=>{
        getNotesList()
    },[page, limit])
  return (
    <div>
          <h1 className='mb-5 font-bold text-2xl'>List Of Notes</h1>
        <table className='w-full'>
            <thead className='w-full'>
                <tr className='flex w-full gap-2'>
                    <th className='w-[13%] text-start'>Title</th>
                    <th className='w-[13%] text-start'>Author</th>
                    <th className='w-[13%] text-start'>Date Time</th>
                    <th className='w-[13%] text-start'>description</th>
                    <th className='w-[13%] text-start'>status</th>
                    <th className='w-[13%] text-start'>expired</th>
                    <th className='w-[13%] text-start'>Actions</th>
                </tr>
            </thead>
            <tbody className='flex flex-col gap-3 py-2 mt-2 border-t-2 border-black h-[65vh] overflow-y-scroll'>
                {
                    notesList?.map((item,index)=>(
                        <tr className='flex gap-2' key={index}>
                            <td className='w-[13%] text-start'>{item?.title}</td>
                            <td className='w-[13%] text-start'>{item?.author}</td>
                            <td className='w-[13%] text-start'>
                                <p className='w-[84%] flex text-wrap overflow-hidden'>
                                {item?.dateTime}
                                </p>
                            </td>
                            <td className='w-[13%] text-start'>{item?.description}</td>
                            <td className='w-[13%] text-start'>{item?.status ? "True" : "False"}</td>
                            <td className='w-[13%] text-start'>{item?.expired ? "True" : "False"}</td>
                            <td className='w-[13%] text-start flex gap-3'>
                                <button className='border-2 border-gray-500 text-gray-800 px-4 rounded-md' onClick={()=>{
                                    dispatch(setNote(item))
                                    navigate("/singleNote")
                                }}>Show</button>
                                   <button className='border-2 border-gray-500 text-gray-800 px-4 rounded-md' onClick={()=>{
                                    setShow("Edit")
                                    setUpdateNote(item)
                                }}>Edit</button>
                                <button className='border-2 border-gray-500 text-gray-800 px-4 rounded-md' onClick={(e) => {
                                    deleteNote(e, item?._id)
                                }}>Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
            <div className='mt-8 flex justify-between'>
                <div>
                    <input type='number' className='w-14' value={limit} onChange={(e)=>{
                        setLimit(parseInt(e.target.value))
                        setPage(0)
                    }} />
                </div>
                <div className='flex gap-2'>
                   {showPrev && <button
                    onClick={() => {
                        setPage(page - 1);
                    }}>Prev</button>}
                    {showNext && <button
                    onClick={() => {
                        setPage(page + 1);
                    }}
                    >Next</button>}
                </div>
            </div>
    </div>
  )
}

export default NoteListTable