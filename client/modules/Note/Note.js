import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Import Style
// import styles from './Note.css';

class Note extends Component {
  render() {
    return (
      <div className="note">
        <p className="note__task">{this.props.note.task}</p>
        <div className="note__options">
          <button className="note__btn note__btn--edit-note">✎</button>
          <button className="note__btn note__btn--delete-note"
                  onClick={() => this.props.deleteNote(this.props.note.id, this.props.laneId)}>
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
  return {};
};

Note.propTypes = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Note);
