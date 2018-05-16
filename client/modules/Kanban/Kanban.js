import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as laneActions from '../Lane/LaneActions';
import * as noteActions from '../Note/NoteActions';

import Lane from '../Lane/Lane';

// Import Style
// import styles from './Kanban.css';

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
        {/*{console.log({props: this.props, lanes: this.props.lanes})}*/}
        {this.props.lanes.map(lane => {
          return <Lane key={lane.id}
                       lane={lane}
                       createNote={this.props.createNoteRequest}
                       deleteNote={this.props.deleteNoteRequest}
                       deleteLane={this.props.deleteLaneRequest} />;
        })}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Kanban);
