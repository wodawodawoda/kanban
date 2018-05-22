import { Router } from 'express';
import * as LaneController from '../controllers/lane.controller';

const router = new Router();

// Get all lanes
router.route('/lanes').get(LaneController.getLanes);

// Get one lane
router.route('/lanes/:laneId').get(LaneController.getLane);

// Add a new Lane
router.route('/lanes').post(LaneController.addLane);

// Edit lane
router.route('/lanes/:laneId').put(LaneController.editLane);

// Delete note from lane.notes array
router.route('/lanes/:laneId/:noteId').delete(LaneController.updateLane);

// Delete lane
router.route('/lanes/:laneId').delete(LaneController.deleteLane);


export default router;
