import mongoose from 'mongoose';
const Schema = mongoose.Schema;
mongoose.plugin(schema => { schema.options.usePushEach = true; });

const kanbanSchema = new Schema({
  name: { type: 'String', required: true },
  lanes: [{ type: Schema.ObjectId, ref: 'Lane', required: true }],
  id: { type: 'String', required: true, unique: true },
});

export default mongoose.model('Kanban', kanbanSchema);
