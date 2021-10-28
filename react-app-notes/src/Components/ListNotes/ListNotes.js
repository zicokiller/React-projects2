import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./ListNotes.css";

export default function ListNotes() {
  const { notes } = useSelector((state) => state.notesReducer);

  return (
    <div className="container-content">
      <h2>Voici vos notes</h2>
      <ul class="notes-list-card">
        {notes.map((item) => (
          <Link to={{ pathname: `/displayNote/${item.title}` }}>
              <li>
                  <h2>{item.title}</h2>
                  <p>{item.subtitle}</p>
              </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
