import React, { useState, useEffect } from "react";
import { Footer } from "./pages/Footer";
import { Header } from "./pages/Header";
import { Notes } from "./pages/Notes";
import axios from "axios";
import { CreateArea } from "./pages/CreateArea";
import { useHistory } from "react-router-dom";
import FormDialog from "./pages/Popup";
import { Loading } from "./pages/Loading";

export const Main = () => {
  const history = useHistory();
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse ] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const getNotes = () => {      
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      };
      axios
        .get(`https://rudrakshi-keeper-app.herokuapp.com/api/notes/`, { headers })
        .then((res) => {
            setIsLoading(false);
          setNotes(res.data);          
        })
        .catch((err) => { err.response.status === 401 && window.location.reload() });
    };
    getNotes();
  }, [response]);

  axios.interceptors.response.use(undefined, function axiosRetryInspector(err) {
    const refreshToken = localStorage.getItem("refresh");
    console.log(refreshToken);
    if (err.response.status === 401 && refreshToken) {      
      axios
        .post(`https://rudrakshi-keeper-app.herokuapp.com/api/accounts/token/refresh/`, {
          refresh: refreshToken,
        })
        .then((res) => res.data)
        .then((res) => {
          err.config.headers["Authorization"] = "Bearer " + res.access;
          localStorage.setItem("access", res.access);
          return axios.request(err.config);
        });
    } else if (err.response.status === 400) {
      history.push("/");
    }
    return Promise.reject(err);
  });

  const addNote = (note) => { 
    setIsLoading(true);
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access"),
    };
    axios
      .post(`https://rudrakshi-keeper-app.herokuapp.com/api/notes/create/`, note, { headers })
      .then((res) => {
        // setNotes([...notes, note])
        setResponse(res.data);
        // setNotes((prevState) => prevState.push(res.data));
      })
      .catch((err) => console.log(err));

    
  };

  const deleteNote = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access"),
    };
    axios
      .delete(`https://rudrakshi-keeper-app.herokuapp.com/api/notes/${id}/`, { headers })
      .then((res) => res.data)
      .catch((err) => console.log(err));
    setNotes(notes.filter((note) => note.id !== id));
  };

  const updateNote = (note) => {
    console.log(updateId, "updateId");
    setOpen(false);
    setIsLoading(true);
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access"),
    };
    axios
      .put(`https://rudrakshi-keeper-app.herokuapp.com/api/notes/${updateId}/`, note, { headers })
      .then((res) => {    
        
        console.log(note, "note");
        
        setNotes(notes.filter(note=>note.id !== updateId))  
        setResponse(res.data);
        
      })
      .catch((err) => console.log(err));
   
    console.log("kk");
  };

  const logout = () => {
    const token = {
      refresh: localStorage.getItem("refresh"),
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access"),
    };
    axios
      .post("https://rudrakshi-keeper-app.herokuapp.com/api/accounts/logout/", token, { headers })
      .then(() => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("username");
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  const [open, setOpen] = useState(false);
  const [updateId, setUpdateId] = useState("");

  const handleClickOpen = () => {
    console.log(open, "open");

    setOpen(true);
  };

  return (
    <div>
      <Header logout={logout} />
      <CreateArea onAdd={addNote} />
      <div>
      {isLoading ? (
        <Loading />
      ) : (
        <Notes
          notes={notes}
          onDelete={deleteNote}
          OpenPopup={handleClickOpen}
          setUpdateId={setUpdateId}
        />
      )}
      </div>
      <FormDialog open={open} setOpen={setOpen} updateNote={updateNote} />
      <Footer />
    </div>
  );
};
