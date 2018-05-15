// Import Actions
import { CREATE_NOTE, DELETE_NOTE, UPDATE_NOTE } from './NoteActions'

// Initial State
const initialState = {};

const NoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NOTE:
      return [...state, action.note];

    case UPDATE_NOTE:
      return state.map(note => {
        if (note.id === action.id) {
          return Object.assign({}, note, action.note);
        }
        return note;
      });

    case DELETE_NOTE:
      return state.filter(note => {
        return note.id !== action.id;
      });

    default:
      return state;
  }
};

export default NoteReducer;
