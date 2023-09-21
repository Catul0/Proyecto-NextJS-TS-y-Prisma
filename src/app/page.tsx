"use client"

import NoteFrom from '@/components/NoteFrom';
import { useEffect } from 'react'
import { useNotes } from '@/context/NoteContext';
import NoteCard from '@/components/NoteCard';


function HomePage() {
  const {notes,loadNotes} = useNotes();

  useEffect(()=>{
    loadNotes();
  },[])

  return (
    <div className='flex items-center justify-center h-screen'>
      <div>
        <NoteFrom />
        {notes.map(note => (
          <NoteCard note = {note} key={note.id}/>
        ))
        }
      </div>
    </div>
  )
}

export default HomePage;