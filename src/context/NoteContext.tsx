"use client"
import { createContext, useContext, useState } from "react";
import { Note } from "@prisma/client";
import { CreateNote, UpdateNote } from "@/interfaces/Note";
interface Children {
    children: React.ReactNode;
}

export const NoteContext = createContext<{
    notes: Note[];
    loadNotes: () => Promise<void>;
    createNote: (nota: CreateNote) => Promise<void>;
    updateNote: (id:number,nota: UpdateNote) => Promise<void>;
    deleteNote: (id: number) => Promise<void>;
    selectedNote: Note | null;
    setSelectedNote: (note: Note | null) => void;
}>({
    notes: [],
    loadNotes: async () => { },
    createNote: async (nota: CreateNote) => { },
    updateNote: async (id:number,nota: UpdateNote) => { },
    deleteNote: async (id: number) => { },
    selectedNote: null,
    setSelectedNote: (note: Note | null) => { }
})

export const useNotes = () => {
    const context = useContext(NoteContext)
    if (!context) {
        throw new Error('useNotes must be used within a NotesProvider')
    }
    return context;
}

export const NotesProvider = ({ children }: Children) => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);

    async function loadNotes() {
        const res = await fetch("/api/notes");
        const data = await res.json();
        setNotes(data);
    }
    async function createNote(nota: CreateNote) {
        const res = await fetch('/api/notes', {
            method: 'POST',
            body: JSON.stringify(nota),
            headers: {
                'content-Type': 'application/json'
            }
        })
        const newNote: Note = await res.json()
        setNotes([...notes, newNote]);
    }

    async function deleteNote(id: number) {
        const res = await fetch('http://localhost:3000/api/notes/' + id, {
            method: 'DELETE',
        })
        const data = await res.json()
        setNotes(notes.filter((note) => note.id !== id));
    }
    async function updateNote(id: number, nota: UpdateNote) {
        const res = await fetch('http://localhost:3000/api/notes/' + id,  {
            body: JSON.stringify(nota),
            method: 'PUT',
            headers: {
                'content-Type': 'application/json'
            }
        })
        const data = await res.json()
        setNotes(notes.map(note => note.id === id ? data : note));
    }

    return (
        <NoteContext.Provider
            value={{
                notes,
                loadNotes,
                createNote,
                updateNote,
                deleteNote,
                selectedNote,
                setSelectedNote

            }}>{children}
        </NoteContext.Provider>
    )
}