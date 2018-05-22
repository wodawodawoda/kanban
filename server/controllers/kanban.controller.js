import Kanban from '../models/kanban';
import Lane from '../models/lane';
import uuid from 'uuid';

export function getKanban(req, res) {
  Kanban.find().exec((err, kanbans) => {
    if (err) {
      res.send(500).send(err);
    }
    res.json({ kanbans });
  });
}

export function addKanban(req, res) {
  if (!req.body.name) {
    res.send(403).end();
  }

  const newKanban = new Kanban(req.body);

  newKanban.lanes = [];
}

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
