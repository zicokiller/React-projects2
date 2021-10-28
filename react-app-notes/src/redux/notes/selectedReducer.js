import { v4 as uuidv4 } from "uuid";

const INITIAL_STATE = {
  selectedNote: {
    title: "",
    subtitle: "",
    body: "",
    id: "",
    toggle: false,
  },
};

export default function selectedReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "VISUALIZE_NOTE": 
      return {
        selectedNote: {
          ...action.payload,
          toggle: true /* Très important: 'toggle' à 'true' permet d'éditer un new texte */,
        },
      };
    

    case "RESET_MODIFY_NOTE": 
      return {
        selectedNote: {
        title: "",
        subtitle: "",
        body: "",
        id: "",
        toggle: false /* Très important: 'toggle' repasse à false après modifs (edit) */,
      },
    }
 }
  return state;
}



