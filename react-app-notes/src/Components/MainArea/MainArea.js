import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuiv4 } from "uuid";

import "./MainArea.css";

export default function MainArea() {
  const [inpInfo, setInpInfo] = useState({
    title: "",
    subtitle: "",
    body: "",
  });

  const dispatch = useDispatch();

  const [validation, setValidation] = useState(true); // passera à false si le form est mal rempli

  const allInp = useRef([]);

  /* Func call chaque x que je veux la ref d'un élément */
  const addInp = (el) => {
    /* if = est-ce-que 'el' existe et (&&) n'est pas (!) présent ds 'allInp' */
    if (el && !allInp.current.includes(el)) {
      allInp.current.push(el); /* si pas présent alors l'élément est ajouté */
    }
  };

  const handleForm = (e) => {
    e.preventDefault();
    if (inpInfo.title.length < 1) {
      setValidation(false);
      return;
    }
    setValidation(true);

    dispatch({
      type: "ADD_NOTE",
      payload: {
        ...inpInfo,
        id: uuiv4() // Un 'id' sera crée sur chaque new note
      } 
    });

    /* Ici, je remets les inputs à zéro une fois la note enregistrée */
    setInpInfo({
      title: "",
      subtitle: "",
      body: ""
    })
  };

  const updateInputs = (e) => {
    /* Ici, je target tous les 'id' correspondant 
       aux inputs ('title', 'subtitle', 'body')  */
    const actualInp = e.target.getAttribute("id");

    /* Et je balance une copie de  'inpInfo' (state précédent) 
       + 'actualInp' avec les nouvelles valeurs des 3 inputs */
    const newObjState = {...inpInfo, [actualInp]: e.target.value};
      setInpInfo(newObjState);
  };

  return (
    <div className="container-content">
      <h2>Votre Note</h2>

      <form onSubmit={handleForm}>
        <label htmlFor="title">Titre</label>
        <input
          value={inpInfo.title}
          onChange={updateInputs}
          ref={addInp}
          type="text"
          id="title"
        />

        {!validation && (
          <span className="info-validation">
            Veuillez renseigner un titre
          </span>
        )}

        <label htmlFor="subtitle">Sous-titre</label>
        <input
          value={inpInfo.subtitle}
          onChange={updateInputs}
          ref={addInp}
          type="text"
          id="subtitle"
        />

        {/* {!validation && (
          <span className="info-validation">
            Veuillez renseigner un sous-titre
          </span>
        )} */}

        <label htmlFor="body">Votre Note</label>
        <textarea
          value={inpInfo.body}
          onChange={updateInputs}
          ref={addInp}
          id="body"
          placeholder="votre texte..."
        ></textarea>
        <button>Enregistrer</button>
      </form>
    </div>
  );
}
