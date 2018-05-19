// Import Actions
import {
  CREATE_LANE, CREATE_LANES, DELETE_LANE, MOVE_BETWEEN_LANES, MOVE_WITHIN_LANE,
  UPDATE_LANE, MOVE_LANE
} from './LaneActions'
import { CREATE_NOTE, DELETE_NOTE } from '../Note/NoteActions';
import omit from 'lodash/omit';

// helper functions

function moveNotes(array, sourceNoteId, targetNoteId) {
  const sourceIndex = array.indexOf(sourceNoteId);
  const targetIndex = array.indexOf(targetNoteId);
  const arrayCopy = [...array];

  arrayCopy.splice(targetIndex, 0, arrayCopy.splice(sourceIndex, 1)[0]);
  return arrayCopy;
}

const arrayToDictionary = (array, keyField) =>
  array.reduce((obj, item) => {
    obj[item[keyField]] = item;
    return obj;
  }, {})

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

    case MOVE_WITHIN_LANE: {
      const newLane = { ...state[action.laneId] };
      newLane.notes = moveNotes(newLane.notes, action.sourceId, action.targetId);
      return { ...state, [action.laneId]: newLane };
    }

    case MOVE_BETWEEN_LANES: {
      const targetLane = { ...state[action.targetLaneId] };
      targetLane.notes = [...targetLane.notes, action.noteId];

      const sourceLane = { ...state[action.sourceLaneId] };
      sourceLane.notes = sourceLane.notes.filter(noteId => noteId !== action.noteId);

      return { ...state, [action.targetLaneId]: targetLane, [action.sourceLaneId]: sourceLane };
    }

    case MOVE_LANE: {
      const Lanes = Object.values(state);
      const newLanes = moveNotes(Lanes, action.sourceId, action.targetId);
      const newState = arrayToDictionary(newLanes, 'id')
      return newState;
    }

    default:
      return state;
  }
};

export default LaneReducer;
