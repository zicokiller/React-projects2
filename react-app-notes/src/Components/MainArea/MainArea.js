import React, { useState, useEffect, useRef } from "react";
import './MainArea.css';

export default function MainArea() {
  return (
  <div className="container-content">
      <h2>Votre plume</h2>

      <form>
          <label htmlFor="title">Titre</label>
          <input type="text" id="title" />

          <label htmlFor="subtitle">Sous-titre</label>
          <input type="text" id="subtitle" />

          <label htmlFor="text-body">Votre Texte</label>
          <textarea id="text-body" placeholder="Votre Texte..."></textarea>
          <button>Enregistrer</button>
      </form>
  </div>);
}
