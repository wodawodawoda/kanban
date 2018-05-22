import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

// React DnD
import { DropTarget, DragSource } from 'react-dnd';
import ItemTypes from '../Kanban/itemTypes';


// Import Style
import './Lane.sass';
import NoteContainer from '../Note/NoteContainer';
import { deleteLaneRequest, updateLaneRequest, moveBetweenLanes, moveLane } from './LaneActions';
import { createNoteRequest } from '../Note/NoteActions';
import callApi from '../../util/apiCaller';

class Lane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddNote: '',
    };
  }

  handleForm = (e) => {
    e.preventDefault();
    if (!e.target.form[0].value) return;
    this.props.createNoteRequest(e.target.form[0].value, this.props.lane.id);
    e.target.form[0].value = '';
    this.setState({ showAddNote: '' });
  }

  handleShowAddNote = () => {
    let show = 'lane__add-form--visible';
    if (this.state.showAddNote) show = '';
    this.setState({
      showAddNote: show,
    });
  }

  handleEditName = (e) => {
    e.target.previousSibling.contentEditable = !!e.target.previousSibling.contentEditable;
  }

  handleEditSubmit = (e) => {
    if (e.keyCode === 13) {
      this.props.updateLaneRequest(this.props.lane.id, e.target.innerText, 'updateLane');
      e.target.contentEditable = false;
    }
  }

  render() {
    return this.props.connectDragSource(this.props.connectDropNoteTarget(this.props.connectDropLaneTarget(
      <div className="lane">
        <div className="lane__options">
          <button className="lane__btn lane__btn--show-add-note" onClick={this.handleShowAddNote}>+</button>
          <button className="lane__btn lane__btn--delete-lane" onClick={() => this.props.deleteLaneRequest(this.props.lane.id)}>X</button>
        </div>
        <header className="lane__header">
          <div className="lane__title">
            <h4 className="lane__name" onKeyDown={e => this.handleEditSubmit(e)}>
              {this.props.lane.name}
            </h4>
            <button className="lane__btn lane__btn--edit-name" onClick={e => this.handleEditName(e)}>✎</button>
          </div>
          <form id="addNoteForm" className={`lane__add-form ${this.state.showAddNote}`}>
            <input type="text" className="lane__form-task" />
            <button type="submit" className="lane__btn lane__btn--add-note" onClick={e => this.handleForm(e)}>Add note</button>
          </form>
        </header>
        <div className="notes">
          {this.props.lane.notes.map(note => {
            return (
              <NoteContainer
                key={note}
                note={this.props.notes[note]}
                laneId={this.props.lane.id}
              />
            );
          })}
        </div>
      </div>
    )));
  }
}

const mapStateToProps = (state) => {
  return {
    notes: state.notes,
    lanes: state.lanes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ moveBetweenLanes, moveLane, deleteLaneRequest, updateLaneRequest, createNoteRequest }, dispatch);
};

Lane.propTypes = {
};


// React DnD
const laneSource = {
  beginDrag(props) {
    return {
      id: props.lane.id,
    };
  },
  isDragging(props, monitor) {
    return props.lane.id === monitor.getItem().id;
  },
};

const laneTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();

    if (targetProps.lane.id !== sourceProps.id) {
      targetProps.moveLane(
        sourceProps.id,
        targetProps.lane.id,
      );
    }
  },
};

const noteTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    let { id: noteId, laneId: sourceLaneId } = sourceProps;
    if (!targetProps.lane.notes.includes(sourceProps.id)) {
      targetProps.moveBetweenLanes(
        targetProps.lane.id,
        noteId,
        sourceLaneId,
      );
    }
  },
  drop(props, monitor) {
    const notes = props.lanes[props.lane.id].notes.map(id => props.notes[id]._id);
    const objectId = props.notes[monitor.getItem().id]._id;
    callApi(`lanes/${props.lane.id}`, 'put', { notes });
    callApi(`lanes/${monitor.getItem().laneId}/${objectId}`, 'delete');
  },
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DropTarget(ItemTypes.NOTE, noteTarget, dragConnect => ({
    connectDropNoteTarget: dragConnect.dropTarget(),
  })),
  DragSource(ItemTypes.LANE, laneSource, (con, monitor) => ({
    connectDragSource: con.dragSource(),
    isDragging: monitor.isDragging(),
  })),
  DropTarget(ItemTypes.LANE, laneTarget, dragConnect => ({
    connectDropLaneTarget: dragConnect.dropTarget(),
  })),
)(Lane);
