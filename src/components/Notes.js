import React, { useState, useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/noteContext'
import AddNote from './AddNote'
import NoteItem from './NoteItem'

const Notes = (props) => {
    const context = useContext(noteContext)
    const { notes, getNotes, editNote } = context
    const navigate = useNavigate()
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes()
        } else {
            navigate("/")
        }
        // eslint-disable-next-line
    }, [])
    const refEdit = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ eid: "", etitle: "", edescription: "", etag: "" })

    const onTextChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const editCurrentNote = (currentNote) => {
        refEdit.current.click()
        setNote({ eid: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const saveNote = (e) => {
        console.log("Updating the note...", note)
        editNote(note.eid, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        props.showAlert("Updated Note Successfully", "success")
    }

    return (
        <>
            <AddNote showAlert={props.showAlert}/>

            {/* Edit Modal */}
            <button ref={refEdit} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" />
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onTextChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onTextChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onTextChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button disabled={note.etitle.length<3 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={saveNote} >Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row my-3'>
                <h1>Your Notes</h1>
                <div className='container mx-2'>
                    {notes.length === 0 && 'Add notes to display here'}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} showAlert={props.showAlert} editNote={editCurrentNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes