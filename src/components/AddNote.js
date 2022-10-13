import React, { useState, useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {
    const context = useContext(noteContext)
    const { addNote } = context

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const addThisNote = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
        props.showAlert("Added Note Successfully", "success")
        setNote({ title: "", description: "", tag: "" })
    }

    const onTextChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <div className='container my-3'>
                <h1>Add Notes</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' value={note.title} onChange={onTextChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onTextChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea type="text" rows={3} className="form-control" id="description" name='description' value={note.description} onChange={onTextChange} />
                    </div>
                    <button disabled={note.title.length < 3 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={addThisNote}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote