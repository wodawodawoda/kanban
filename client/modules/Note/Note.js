import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';

// React DnD
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from '../Kanban/itemTypes';


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
    const opacity = this.props.isDragging ? 0.4 : 1;
    return this.props.connectDragSource(this.props.connectDropTarget(
      <div className="note" style={{opacity}}>
        <p className="note__task" onKeyDown={e => this.handleEditSubmit(e)}>{this.props.note.task}</p>
        <div className="note__options">
          <button className="note__btn note__btn--edit-note" onClick={e => this.handleEditNote(e)}>✎</button>
          <button className="note__btn note__btn--delete-note"
                  onClick={() => this.props.deleteNoteRequest(this.props.note.id, this.props.laneId)}>
            X
          </button>
        </div>
      </div>
    ));
  }
}

Note.propTypes = {
};

const noteSource = {
  beginDrag(props, component) {
    // console.log(props)
    return {
      id: props.note.id,
      laneId: props.laneId,
    };
  },
  isDragging(props, monitor) {
    return props.note.id === monitor.getItem().id;
  },
  endDrag(props) {

  }
};

const noteTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();

    if (targetProps.note.id !== sourceProps.id) {
      targetProps.moveWithinLane(targetProps.laneId, targetProps.note.id, sourceProps.id);
    }
  },
};

export default compose(
  DragSource(ItemTypes.NOTE, noteSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })),
  DropTarget(ItemTypes.NOTE, noteTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  }))
)(Note);
