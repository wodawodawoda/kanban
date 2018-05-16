import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Import Style
// import styles from './Note.css';

class Note extends Component {
  render() {
    return (
      <div className="note">
        {/*<p className="note__task">{this.props.note.task}</p>*/}
        <button className="note__delete-note"
                onClick={() => this.props.deleteNote(this.props.note.id, this.props.laneId)}>
          Delete note
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

Note.propTypes = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Note);
