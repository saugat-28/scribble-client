import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

     // Get All Notes
     const getNotes = async () => {
        // API CALL
        await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        }).then(r =>  r.json().then(data =>setNotes(data)));
    }

    // Add a Note
    const addNote = async (title, description, tag) => {
        // API CALL
        await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        }).then(response => response.json().then(data => setNotes(notes.concat(data))));
    }
    
    // Edit a Note
    const editNote = async (id, title, description, tag) => {
         // API CALL
         const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const json = await response.json(); 
        console.log(json)
        // Logic to Edit in client
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if(element._id === id){
                newNotes[index].tag = tag
                newNotes[index].title = title
                newNotes[index].description = description
                break;
            }
        }
        setNotes(newNotes)
    }
    
    // Delete a Note
    const deleteNote = async (id) => {
          // API CALL
          const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json(); 
        console.log("Deleteing Note With ID: " + id, json)
        const newNotes = notes.filter((note)=> {return note._id!==id})
        setNotes(newNotes)
    }

    return (
        <NoteContext.Provider value={{notes, getNotes, addNote, editNote, deleteNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState