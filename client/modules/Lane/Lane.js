import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


// Import Style
// import styles from './Lane.css';
import Note from '../Note/Note';

class Lane extends Component {

  handleForm = (e) => {
    e.preventDefault();
    this.props.createNote(e.target.form[0].value, this.props.lane.id);
  }

  render() {
    return (
      <div className="lane">
        <header className="lane__header">
          <h4 className="lane__name">{this.props.lane.name}</h4>
          <form action="" className="lane__add-form">
            <input type="text" className="lane__form-task" />
            <button type="submit" className="lane__add-note" onClick={e => this.handleForm(e)}>Add note</button>
          </form>
          <button className="lane__delete-lane" onClick={() => this.props.deleteLane(this.props.lane.id)}>Delete lane</button>
        </header>
        <div className="notes">
          {this.props.lane.notes.map(note => {
            return <Note key={note.id}
                         note={this.props.notes[note]}
                         deleteNote={this.props.deleteNote}
                         laneId={this.props.lane.id} />;
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notes: state.notes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

Lane.propTypes = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lane);
