import React from 'react'
import NoteFrom from '@/components/NoteFrom';

interface Note{
  id:number;
  title:string;
  content:string;
  createAt:string;
  updateAt:string; 
}

async function LoadNotes() {

  const res = await fetch("http://localhost:3000/api/notes");
  const data = await res.json();
  if(data){
    return data;
  }
  

}

async function HomePage() {
  const notes:Note[] = await LoadNotes();
  return (
    <div className='flex items-center justify-center h-screen'>
      <div>
        <NoteFrom />
        {notes.map(note => (
          <div key={note.id} className='bg-slate-400 p-4 my-2 rounded-md' >
            <h3 className='text-[20px]'><b>{note.title}</b></h3>
            <p>{note.content}</p>
          </div>
        ))
        }
      </div>
    </div>
  )
}

export default HomePage;