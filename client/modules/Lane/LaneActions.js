import callApi from '../../util/apiCaller';
import { createNotes } from '../Note/NoteActions';

// Import normalizr
import { lanes } from '../../util/schema';
import { normalize } from 'normalizr';

// Export Constants
export const CREATE_LANE = 'CREATE_LANE';
export const CREATE_LANES = 'CREATE_LANES';
export const UPDATE_LANE = 'UPDATE_LANE';
export const DELETE_LANE = 'DELETE_LANE';
export const MOVE_WITHIN_LANE = 'MOVE_WITHIN_LANE';
export const MOVE_BETWEEN_LANES = 'MOVE_BETWEEN_LANES';
export const MOVE_LANE = 'MOVE_LANE';


// Export Actions
export function createLane(lane) {
  return {
    type: CREATE_LANE,
    lane,
  };
}

export function createLaneRequest(laneName) {
  return (dispatch) => {
    return callApi('lanes', 'post', {
      name: laneName,
    }).then(res => dispatch(createLane(res)));
  };
}

export function createLanes(lanes) {
  return {
    type: CREATE_LANES,
    lanes,
  };
}

export function fetchLanes() {
  return (dispatch) => {
    return callApi('lanes').then(res => {
      const normalized = normalize(res.lanes, lanes);
      const { lanes: normalizedLanes, notes } = normalized.entities;
      dispatch(createLanes(normalizedLanes));
      dispatch(createNotes(notes));
    });
  };
}

export function updateLane(lane) {
  return {
    type: UPDATE_LANE,
    lane,
  };
}

export function updateLaneRequest(laneId, laneName) {
  return (dispatch) => {
    return callApi(`lanes/${laneId}`, 'put', {
      name: laneName,
    }).then(res => {
      const notes = res.notes.map(note => note.id);
      dispatch(updateLane(notes));
    });
  };
}

export function deleteLane(laneId) {
  return {
    type: DELETE_LANE,
    laneId,
  };
}

export function deleteLaneRequest(laneId) {
  return (dispatch) => {
    return callApi(`lanes/${laneId}`, 'delete')
      .then(() => dispatch(deleteLane(laneId)));
  };
}

export function moveWithinLane(laneId, targetId, sourceId) {
  return {
    type: MOVE_WITHIN_LANE,
    laneId,
    targetId,
    sourceId,
  };
}

export function moveBetweenLanes(targetLaneId, noteId, sourceLaneId) {
  return {
    type: MOVE_BETWEEN_LANES,
    targetLaneId,
    noteId,
    sourceLaneId,
  };
}

export function moveLane(sourceId, targetId) {
  return {
    type: MOVE_LANE,
    sourceId,
    targetId,
  };
}
