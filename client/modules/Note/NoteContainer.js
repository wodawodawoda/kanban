import { connect } from 'react-redux';
import Note from './Note';
import * as noteActions from './NoteActions'
import { moveWithinLane, moveWithinLaneRequest } from '../Lane/LaneActions'
import { bindActionCreators } from 'redux'

const mapStateToProps = (state) => {
  return {
    lanes: state.lanes,
    notes: state.notes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ ...noteActions, moveWithinLane, moveWithinLaneRequest }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Note);
