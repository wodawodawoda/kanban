import mongoose from 'mongoose';
const Schema = mongoose.Schema;
mongoose.plugin(schema => { schema.options.usePushEach = true });

const laneSchema = new Schema({
  name: { type: 'String', required: true },
  notes: [{ type: Schema.ObjectId, ref: 'Note', required: true }],
  id: { type: 'String', required: true, unique: true },
});

laneSchema.pre('find', function (next) {
  this.populate('notes');
  next();
});

laneSchema.pre('findOne', function (next) {
  this.populate('notes');
  next();
});

laneSchema.pre('remove', function (next) {
  // this.pull('notes');
  next();
});

export default mongoose.model('Lane', laneSchema);
