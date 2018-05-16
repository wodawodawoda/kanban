import callApi from '../../util/apiCaller';
import { deleteLane } from '../Lane/LaneActions'

// Export Constants
export const CREATE_NOTE = 'CREATE_NOTE';
export const CREATE_NOTES = 'CREATE_NOTES';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';

// Export Actions
export function createNote(note, laneId) {
  return {
    type: CREATE_NOTE,
    laneId,
    note,
  };
}

export function createNoteRequest(task, laneId) {
  return (dispatch) => {
    return callApi('notes', 'post', {
      note: {
        task,
      },
      laneId,
    }).then(res => dispatch(createNote(res, laneId)));
  };
}

export function createNotes(notes) {
  return {
    type: CREATE_NOTES,
    notes,
  };
}

export function updateNote(note) {
  return {
    type: UPDATE_NOTE,
    note,
  };
}

export function deleteNote(noteId, laneId) {
  return {
    type: DELETE_NOTE,
    noteId,
    laneId,
  };
}

export function deleteNoteRequest(noteId, laneId) {
  return (dispatch) => {
    return callApi(`notes/${noteId}`, 'delete')
      .then(res => dispatch(deleteNote(noteId, laneId)));
  };
}

