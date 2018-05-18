// Import Actions
import { CREATE_NOTE, CREATE_NOTES, DELETE_NOTE, UPDATE_NOTE } from './NoteActions'

// Initial State
const initialState = {};

const NoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NOTE:
    case UPDATE_NOTE:
      console.log(action)
      return { ...state, [action.note.id]: action.note };

    case CREATE_NOTES:
      return { ...action.notes };

    case DELETE_NOTE: {
      const newState = state;
      delete newState[action.noteId];
      return { ...newState };
    }

    default:
      return state;
  }
};

export default NoteReducer;
