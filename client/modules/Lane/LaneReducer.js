// Import Actions
import { CREATE_LANE, CREATE_LANES, DELETE_LANE, UPDATE_LANE } from './LaneActions';
import { CREATE_NOTE, DELETE_NOTE } from '../Note/NoteActions'
import omit from 'lodash/omit';


// Initial State
const initialState = {};

const LaneReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_LANES:
      return { ...action.lanes };

    case CREATE_LANE:
    case UPDATE_LANE:
      return { ...state, [action.lane.id]: action.lane };

    case DELETE_LANE:
      const newState = { ...state };
      delete newState[action.laneId];
      return { ...newState };

    case CREATE_NOTE: {
      const newLane = { ...state[action.laneId] };
      newLane.notes.push(action.note.id);
      return { ...state, [action.laneId]: newLane};
    }

    case DELETE_NOTE: {
      const newLane = { ...state[action.laneId] };
      newLane.notes = newLane.notes.filter(noteId => noteId !== action.noteId);
      return { ...state, [action.laneId]: newLane };
    }

    default:
      return state;
  }
};

export default LaneReducer;
