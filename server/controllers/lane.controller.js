import Lane from '../models/lane';
import uuid from 'uuid';
import { Types } from 'mongoose';


/**
 * @description Add new lane document
 * @param req
 * @param res
 * @return new lane document
 */
export function addLane(req, res) {
  if (!req.body.name) {
    res.status(403).end();
  }

  const newLane = new Lane(req.body);

  newLane.notes = [];

  newLane.id = uuid();

  newLane.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(saved);
  });
}

/**
 * @description Get all documents from Lanes collection
 * @param req
 * @param res
 * @return object with lanes property (array of documents)
 */
export function getLanes(req, res) {
  Lane.find().exec((err, lanes) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ lanes });
  });
}

/**
 * @description Search for specified lane document
 * @param req
 * @param res
 * @return single lane document
 */
export function getLane(req, res) {
  Lane.findOne({ id: req.params.laneId }).exec((err, lane) => {
    if (err) {
      res.status(500).send(err);
    }

    res.json({ lane });
  });
}

/**
 * @description Edit lane properties (name, notes)
 * @param req
 * @param res
 * @return updated lane document
 */
export function editLane(req, res) {
  Lane.findOneAndUpdate({ id: req.params.laneId }, req.body, { new: true }, (err, lane) => {
    if (err) {
      res.status(500).send(err);
    }
    res.send(lane);
  });
}

/**
 * @description Remove note from lane after draging it to another lane
 * @param req
 * @param res
 * @return updated lane document
 */
export function updateLane(req, res) {
  const id = Types.ObjectId(req.params.noteId)
  Lane.findOneAndUpdate({ id: req.params.laneId }, { $pull: { notes: id } }, { new: true }, (err, lane) => {
    if (err) {
      res.status(500).send(err);
    }
    res.send(lane);
  });
}

/**
 * @description Deleting lane
 * @param req
 * @param res
 */
export function deleteLane(req, res) {
  Lane.findOne({ id: req.params.laneId }).exec((err, lane) => {
    if (err) {
      res.status(500).send(err);
    }

    // Remove lane notes
    lane.notes.forEach(note => note.remove());

    lane.remove(() => {
      res.status(200).end();
    });
  });
}
