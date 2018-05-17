import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


// Import Style
// import styles from './Lane.css';
import Note from '../Note/Note';

class Lane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddNote: '',
    };
  }

  handleForm = (e) => {
    e.preventDefault();
    this.props.createNote(e.target.form[0].value, this.props.lane.id);
  }

  handleShowAddNote = () => {
    let show = 'lane__add-form--visible';
    if(this.state.showAddNote) show = '';
    console.log(show)
    this.setState({
      showAddNote: show,
    });
  }

  render() {
    return (
      <div className="lane">
        <div className="lane__options">
          <button className="lane__btn lane__btn--show-add-note" onClick={this.handleShowAddNote}>+</button>
          <button className="lane__btn lane__btn--delete-lane" onClick={() => this.props.deleteLane(this.props.lane.id)}>X</button>
        </div>
        <header className="lane__header">
          <h4 className="lane__name">{this.props.lane.name}</h4>
          <form id="addNoteForm" className={`lane__add-form ${this.state.showAddNote}`}>
            <input type="text" className="lane__form-task" />
            <button type="submit" className="lane__btn lane__btn--add-note" onClick={e => this.handleForm(e)}>Add note</button>
          </form>
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
