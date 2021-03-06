import { createStore, combineReducers } from 'redux';
import notesReducer from './notes/notesReducer';
import selectedReducer from './notes/selectedReducer';

// Je crée le rootReducer qui combine tous les reducers
const rootReducer = combineReducers({
    notesReducer,
    selectedReducer,
})

// Je crée le store et lui passe rootReducer (qui contient tous les reducers)
const store = createStore(rootReducer);

export default store;