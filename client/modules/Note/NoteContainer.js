import { connect } from 'react-redux';
import Note from './Note';
import { deleteNoteRequest, updateNoteRequest } from './NoteActions';
import { moveWithinLane } from '../Lane/LaneActions';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state) => {
  return {
    lanes: state.lanes,
    notes: state.notes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ deleteNoteRequest, updateNoteRequest, moveWithinLane }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Note);
