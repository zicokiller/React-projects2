import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import './DisplayNote.css';

export default function DisplayNote() {

    const { id } = useParams();

    /* Je selectionne le reducer lié à mon objet 'notes' */
    const { notes } = useSelector(state => state.notesReducer);

    /* J'instancie 'indexArticle' avec la méthode 'findIndex()' 
       pour display la note souhaitée */
    const indexArticle = notes.findIndex(obj => obj.title === id);
    
    return (
        <div className="display-txt-zone">
            <h2 className="title-display"> 
                Votre note: {notes[indexArticle] ? `${notes[indexArticle].title}` : ""}
            </h2>
            <span className="subtitle-display">
            {notes[indexArticle] ? `${notes[indexArticle].subtitle}` : ""}
            </span>
            <p className="txt-display">
            {notes[indexArticle] ? `${notes[indexArticle].body}` : ""}
            </p>
            
        </div>
    )
}
