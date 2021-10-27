import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuiv4 } from "uuid";

import "./MainArea.css";

export default function MainArea() {
  // Hook pour créer une note
  const [inpInfo, setInpInfo] = useState({
    title: "",
    subtitle: "",
    body: "",
  });

  // Hook pour modifier une note (edit)
  const [inpModify, setInpModify] = useState({
    title: "",
    subtitle: "",
    body: "",
  });

  const selected = useSelector((state) => state.selectedReducer.selectedNote);

  useEffect(() => {
    setInpModify(selected);
  }, [selected]);

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

  const updateInputs = (e) => {
    /* Ici, je target tous les 'id' correspondant 
       aux inputs ('title', 'subtitle', 'body') */
    const actualInp = e.target.getAttribute("id");

    /* Pour une note modifiée, j'envoie une copie de 'inpModify' 
       + 'actualInp' avec les nouvelles valeurs */
    if (selected.toggle) {
      const newObjState = { ...inpModify, [actualInp]: e.target.value };
      setInpModify(newObjState);
    } else if (selected.toggle === false) {
      /* Sinon j'envoie une copie de 'inpInfo' (state précédent) 
       + 'actualInp' pour créer une nouvelle note */
      const newObjState = { ...inpInfo, [actualInp]: e.target.value };
      setInpInfo(newObjState);
    }
  };

  const handleForm = (e) => {
    e.preventDefault();
    /* Ici, je modifie une note existante */
    if (selected.toggle) {
      if (selected.title.length < 1) {
        setValidation(false);
        return;
      }
      setValidation(true);

      dispatch({
        type: "UPDATE_NOTE",
        payload: inpModify,
      });
      dispatch({
        type: "RESET_NOTE",
      });
      setInpModify({
        title: "",
        subtitle: "",
        body: "",
      });
    } else if (selected.toggle === false) {
      /* sinon je crée une nouvelle note */
      if (inpInfo.title.length < 1) {
        setValidation(false);
        return;
      }
      setValidation(true);

      dispatch({
        type: "ADD_NOTE",
        payload: {
          ...inpInfo,
          id: uuiv4(), // Un 'id' sera crée sur chaque new note
        },
      });

      /* Ici, je remets les inputs à zéro une fois la note enregistrée */
      setInpInfo({
        title: "",
        subtitle: "",
        body: "",
      });
    }
  };

  return (
    <div className="container-content">
      <h2>Votre Note</h2>

      <form onSubmit={handleForm}>
        <label htmlFor="title">Titre</label>
        <input
          value={
            inpModify.toggle ? inpModify.title : inpInfo.title
          } /* est-ce que 'inpModify.toggle' est 'true'?, si oui
          j'encoie 'inpModify.title' Si non, j'envoie 'inpInfo.title' */
          onChange={updateInputs}
          ref={addInp}
          type="text"
          id="title"
        />

        {!validation && (
          <span className="info-validation">Veuillez renseigner un titre</span>
        )}

        <label htmlFor="subtitle">Sous-titre</label>
        <input
          value={inpModify.toggle ? inpModify.subtitle : inpInfo.subtitle}
          onChange={updateInputs}
          ref={addInp}
          type="text"
          id="subtitle"
        />

        <label htmlFor="body">Votre Note</label>
        <textarea
          value={inpModify.toggle ? inpModify.body : inpInfo.body}
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


