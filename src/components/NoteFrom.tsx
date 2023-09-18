"use client"
import {useState} from 'react'
import { useRouter } from 'next/navigation'
const NoteFrom = () => {

    const [title, setTitle]=useState('')
    const [content, setContent]=useState('')
    const router=useRouter();
    return (
        <form onSubmit={ async (e)=>{
                e.preventDefault()
                const res = await fetch('/api/notes',{
                    method:'POST',
                    body: JSON.stringify({title,content}),
                    headers:{
                        'content-Type': 'application/json'
                    }
                })
                const data = await res.json()
                console.log(data)
        }}>
            <input 
                type="text" 
                name='title' 
                placeholder='Title'
                className='w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2'
                onChange={(e)=>setTitle(e.target.value)}
            />
            <textarea 
                name='content' 
                placeholder="Put note's content here"
                className='w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2'
                onChange={(e)=>setContent(e.target.value)}
            />
            <button className='px-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700'>Create</button>
        </form>

    )
}

export default NoteFrom