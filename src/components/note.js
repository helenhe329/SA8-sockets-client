import React, { Component } from 'react';
import Draggable from 'react-draggable';
// import Marked from 'marked';

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
    };
    this.onDrag = this.onDrag.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.renderNote = this.renderNote.bind(this);
  }

  onDrag(event, position) {
    console.log('dragging');
    this.props.updateNote(this.props.id, { x: position.x, y: position.y });
  }

  onDeleteClick(event) {
    this.props.deleteNote(this.props.id);
  }

  onEditClick(event) {
    this.setState({ isEditing: !this.state.isEditing });
  }

  renderNote() {
    if (this.state.isEditing) {
      return <div>editing!</div>;
    } else {
      return (
        <Draggable
          handle=".note-mover"
          grid={[25, 25]}
          defaultPosition={{ x: 20, y: 20 }}
          position={{
            x: this.props.note.x, y: this.props.note.y,
          }}
          onDrag={this.onDrag}
        >
          <div className="note">
            <div className="note-title">
              {this.props.note.title}
              <div className="icons">
                <div onClick={this.onDeleteClick}><i className="icon fa fa-trash-alt" /></div>
                <div onClick={this.onEditClick}><i className="icon far fa-edit" /></div>
                <div onDrag={this.onDrag} ><i className="note-mover icon fas fa-arrows-alt" /></div>
              </div>
            </div>
          </div>
        </Draggable>
      );
    }
  }

  render() {
    return (
      <div>
        { this.renderNote() }
      </div>
    );
  }
}

export default Note;
