import React from 'react'
import { Note } from '@prisma/client'
import { useNotes } from '@/context/NoteContext'


function NoteCard({note}:{note:Note}) {
    const {deleteNote,setSelectedNote} = useNotes();
    return (
        <div key={note.id} className='bg-slate-400 p-4 my-2 rounded-md flex justify-between' >
            <div className='max-w-[350px]'>
                <h3 className='text-[20px]'><b>{note.title}</b></h3>
                <p>{note.content}</p>
            </div>
            <div className='flex justify-between gap-x-2'>
                <button onClick={async ()=>{
                    if(confirm("Estas seguro de que quieres eliminar nota?")){
                        await deleteNote(note.id)
                    }
                }}>DELETE</button>
                <button
                    onClick={
                        ()=>{
                            setSelectedNote(note);
                        }
                    }
                >EDIT</button>
            </div>
        </div>
    )
}

export default NoteCard