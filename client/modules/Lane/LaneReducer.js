// Import Actions
import { CREATE_LANE, DELETE_LANE, UPDATE_LANE } from './LaneActions';
import { CREATE_NOTE, DELETE_NOTE } from '../Note/NoteActions'


// Initial State
const initialState = [];

const LaneReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_LANE:
      return [...state, action.lane];

    case UPDATE_LANE:
      return state.map(lane => {
        if (lane.id === action.id) {
          return Object.assign({}, lane, action.lane);
        }
        return lane;
      });

    case DELETE_LANE:
      return state.filter(lane => {
        return lane.id !== action.id;
      });

    case CREATE_NOTE:
      return state.map(lane => {
        if (lane.id === action.laneId) {
          const notes = [...lane.notes, action.note.id];
          return { ...lane, notes };
        }
        return lane;
      });

    case DELETE_NOTE:
      return state.map(lane => {
        if (lane.id === action.laneId) {
          const notes = lane.notes.filter(note => note !== action.noteId );
          return { ...lane, notes };
        }
      });

    default:
      return state;
  }
};

export default LaneReducer;
