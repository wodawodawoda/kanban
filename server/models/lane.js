import mongoose from 'mongoose';
const uuidv1 = require('uuid/v1');
const Schema = mongoose.Schema;
mongoose.plugin(schema => { schema.options.usePushEach = true; });

const laneSchema = new Schema({
  name: { type: 'String', required: true },
  notes: [{ type: Schema.ObjectId, ref: 'Note', required: true }],
  id: { type: 'String', default: uuidv1, required: true, unique: true },
});

laneSchema.pre('find', function (next) {
  this.populate('notes');
  next();
});

laneSchema.pre('findOneAndUpdate', function (next) {
  this.populate('notes');
  next();
});

laneSchema.pre('findOne', function (next) {
  this.populate('notes');
  next();
});

export default mongoose.model('Lane', laneSchema);
