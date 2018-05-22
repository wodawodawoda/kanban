import { schema } from 'normalizr';

const note = new schema.Entity('notes');

export const lane = new schema.Entity('lanes', {
  notes: [note],
});

export const lanes = [lane];
