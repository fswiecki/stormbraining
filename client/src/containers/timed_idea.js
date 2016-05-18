import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteTimedIdea, toggleTimedIdea } from '../actions/timed_board_actions';

import { Card, CardHeader, CardText } from 'material-ui/Card';
import ThumbsUp from 'material-ui/svg-icons/action/thumb-up';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';
import Done from 'material-ui/svg-icons/action/done';
import IconButton from 'material-ui/IconButton';

class TimedIdea extends Component {

  static propTypes = {
    content: PropTypes.string.isRequired,
    timedBoardId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    authorId: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    deleteTimedIdea: PropTypes.func.isRequired,
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.renderDeleteTimedIdea = this.renderDeleteTimedIdea.bind(this);
    this.renderToggleTimedIdea = this.renderToggleTimedIdea.bind(this);
  }

  selectButton() {
    const selectedColor = this.props.selected ? this.context.muiTheme.palette.accent1Color : '';
    return (
      <IconButton
        onClick={this.renderToggleTimedIdea}
        touch
        tooltipPosition="bottom-center"
      >
        <Done color={selectedColor} hoverColor={this.context.muiTheme.palette.accent1Color} />
      </IconButton>
    );
  }

  deleteButton() {
    return (
      <IconButton
        onClick={this.renderDeleteTimedIdea}
        tooltip="delete"
        touch
        tooltipPosition="bottom-center"
      >
        <DeleteForever hoverColor={this.context.muiTheme.palette.accent1Color} />
      </IconButton>
    );
  }

  renderToggleTimedIdea() {
    this.props.toggleTimedIdea(this.props.timedBoardId, this.props.id);
  }

  renderDeleteTimedIdea() {
    this.props.deleteTimedIdea(this.props.timedBoardId, this.props.id);
  }

  render() {
    return (
      <div className="cardHolder" style={{position: 'relative'}}>
        <div style={{
          position: 'absolute',
          paddingLeft: '16px',
          paddingTop: '4px',
          boxSizing: 'border-box',
          zIndex: '999'}}
        >
          <span >
            <span style={{ float: 'left', paddingTop: '14px' }}>
              {this.props.content}
            </span>
            {this.deleteButton()}
          </span>
        </div>
        <div style={{
          position: 'absolute',
          display: 'inline-block',
          paddingRight: '16px',
          paddingTop: '4px',
          boxSizing: 'border-box',
          right: '0px',
          zIndex: '999'}}
        >
          <span>{this.selectButton()}</span>
        </div>
        <Card style={{ textAlign: 'left', paddingTop: '10px' }} zDepth={2}>
          <CardHeader
            title={<span>&nbsp;</span>}
          />
        </Card>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteTimedIdea, toggleTimedIdea }, dispatch);
}

export default connect(null, mapDispatchToProps)(TimedIdea);