import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import * as laneActions from '../Lane/LaneActions';
import * as noteActions from '../Note/NoteActions';

import Lane from '../Lane/Lane';

// React DnD
import { DragDropContext, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ItemTypes from '../Kanban/itemTypes';

// Import Style
import './Kanban.sass';

class Kanban extends Component {
  componentDidMount() {
    this.props.fetchLanes();
  }

  handleForm = (e) => {
    e.preventDefault();
    this.props.createLaneRequest(e.target.form[0].value);
  }

  render() {
    return (
      <div className="kanban">
        <form action="" className="kanban__add-form">
          <input type="text" className="kanban__form-name"/>
          <button type="submit" className="kanban__add-lane" onClick={(e) => this.handleForm(e)}>Add Lane</button>
        </form>
        <div className="kanban__lanes">
          {this.props.lanes.map(lane => {
            return <Lane key={lane.id}
                         lane={lane}
                         createNote={this.props.createNoteRequest}
                         deleteNote={this.props.deleteNoteRequest} />;
          })}
        </div>
      </div>
    );
  }
}

Kanban.need = [() => { return laneActions.fetchLanes(); }];

const mapStateToProps = (state) => {
  return {
    lanes: Object.values(state.lanes),
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ ...laneActions, ...noteActions }, dispatch);
};

Kanban.propTypes = {
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DragDropContext(HTML5Backend),
)(Kanban);
