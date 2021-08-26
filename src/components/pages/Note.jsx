import React from 'react'
import { FaTrash, FaPen } from 'react-icons/fa';

export const Note = ({note , onDelete, OpenPopup, setUpdateId }) => {
    return (
    
        <div className="note">
            <p className="note-date"> {note.created_at}</p>

            <h1>{note.title}</h1>
            <p>{note.text}</p>
            <div className="note-foot">
                <p>Updated at: {note.updated_at}</p>
                <div className="note-icon">
                    <FaPen onClick={()=> {
                        OpenPopup(); 
                        setUpdateId(note.id)}
                        } />
                    <FaTrash onClick={()=> onDelete(note.id)} />
                </div>

            </div>
        </div>
    )
}
