import React from "react";
import delIcon from "./remove.svg";
import edit from "./edit.svg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import note from "./Note.css";

export default function Note(props) {
  const dispatch = useDispatch();

  const modifyNote = () => {
    dispatch({
      type: "VISUALIZE_NOTE",
      payload: props, 
    });
  };

  const deleteNote = () => {
    dispatch({
      type: "DELETE_NOTE",
      payload: props.id,
    });
  };
  
  return (
    <li className="txt-note-prev">
      <Link to={{
        pathname: `/displayNote/${props.title}`
      }}>
      <div className="bloc-note-left">
        <p>{props.title}</p>
        <p>{props.subtitle}</p>
      </div>
      </Link>
      <div className="bloc-note-right">
        <button onClick={deleteNote}>
          <img src={delIcon} alt="delete icon" />
        </button>
        <Link to="/edit">
          <button onClick={modifyNote}>
            <img src={edit} alt="edit icon" />
          </button>
        </Link>
      </div>
    </li>
  );
}
