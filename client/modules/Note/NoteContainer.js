import { connect } from 'react-redux';
import Note from './Note';
import * as noteActions from './NoteActions'
import { moveWithinLane } from '../Lane/LaneActions'
import { bindActionCreators } from 'redux'

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ ...noteActions, moveWithinLane }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Note);
