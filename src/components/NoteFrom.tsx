"use client"
import { useState, useRef, useEffect } from 'react'
import { useNotes } from '@/context/NoteContext';
const NoteFrom = () => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { createNote, selectedNote, setSelectedNote, updateNote } = useNotes();
    const titleRef = useRef<HTMLInputElement>(null);


    useEffect(() => {
        if (selectedNote) {
            setTitle(selectedNote.title);
            setContent(selectedNote.content);
        }
    }, [selectedNote])

    return (
        <form onSubmit={async (e) => {
            e.preventDefault()
            if(selectedNote){
                await updateNote(selectedNote.id,{ title, content });
            }else{
                await createNote({ title, content });
            }
            setTitle("");
            setContent("");
            titleRef.current?.focus();
        }}>
            <input
                type="text"
                name='title'
                placeholder='Title'
                className='w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                ref={titleRef}
            />
            <textarea
                name='content'
                placeholder="Put note's content here"
                className='w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2'
                onChange={(e) => setContent(e.target.value)}
                value={content}
            />
            <div className='flex justify-end gap-x-2'>
                <button
                    type='submit'
                    className='px-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-500'
                >{selectedNote ? "Update":"Create"}</button>
                {selectedNote && (
                    <button
                        type='button'
                        className='px-5 py-2 text-white bg-red-600 rounded-md hover:bg-red-500'
                        onClick={() => {
                            setSelectedNote(null)
                            setTitle("");
                            setContent("");
                        }}
                    >Cancel</button>
                )}

            </div>

        </form>

    )
}

export default NoteFrom