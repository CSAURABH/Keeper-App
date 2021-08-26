import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import Fab from '@material-ui/core/Fab';
import { Zoom } from '@material-ui/core';

export const CreateArea = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [note, setNote] = useState({
        title: '',
        text: ''
    })

    function handleChange(event) {
        const {name, value} = event.target;
        setNote(preNote => {
            return {
                ...preNote,
                [name]: value
            };
        });
    }

    function submitNote(event) {
        event.preventDefault();

        props.onAdd(note);
    }

    function expand() {
        setIsOpen(true);
    }
    const mystyle = {
        float: 'right',
        height: '3rem',
        width: '3rem',
        borderRadius: '50%',
        backgroundColor: '#f5ba13',
        border: 'none',
        color: 'white',
        marginTop: '-20px'
      };

    return (
        <div>
            <form>
                { isOpen && <input name="title" value = {note.title} onChange={handleChange} placeholder="Title" />}
                <textarea 
                name="text" 
                onClick = {expand}
                value = {note.text}
                onChange={handleChange}
                placeholder="Take a note ..." 
                rows={isOpen ? 3 : 1}/>
                <Zoom in={isOpen}>
                    <Fab style= {mystyle} onClick={submitNote} > <FaPlus /></Fab>
                </Zoom>
            </form>
        </div>
    )
}
