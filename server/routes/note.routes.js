import { Router } from 'express';
import * as NoteController from '../controllers/note.controller';

const router = new Router();

// Get all notes
router.route('/notes').get(NoteController.getNotes);

// Add note
router.route('/notes').post(NoteController.addNote);

// Update note
router.route('/notes/:noteId').put(NoteController.editNote);

// Delete note
router.route('/notes/:noteId').delete(NoteController.deleteNote);

export default router;
