import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as noteActions from './NoteActions';

// Import Style
// import styles from './Note.css';

class Note extends Component {

  handleEditNote = (e) => {
    e.target.parentNode.previousSibling.contentEditable = !!e.target.parentNode.previousSibling.contentEditable
  }

  handleEditSubmit = (e) => {
    if (e.keyCode === 13) {
      this.props.updateNoteRequest(this.props.note.id, e.target.innerText);
      e.target.contentEditable = false;
    }
  }

  render() {
    return (
      <div className="note">
        <p className="note__task" onKeyDown={e => this.handleEditSubmit(e)}>{this.props.note.task}</p>
        <div className="note__options">
          <button className="note__btn note__btn--edit-note" onClick={e => this.handleEditNote(e)}>✎</button>
          <button className="note__btn note__btn--delete-note"
                  onClick={() => this.props.deleteNoteRequest(this.props.note.id, this.props.laneId)}>
            X
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ ...noteActions }, dispatch);
};

Note.propTypes = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Note);
