import { Note } from "./Note";

export const Notes = ({notes , onDelete , OpenPopup , setUpdateId}) => {
    return (<>
        {notes.map(note => <Note key={note.id}
        onDelete={onDelete}
        setUpdateId={setUpdateId}
        OpenPopup={OpenPopup}
        note={note} />)}
       
    </>)
}

 