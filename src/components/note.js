import React, { Component } from 'react';
import Draggable from 'react-draggable';
import marked from 'marked';

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
    };
    this.onDrag = this.onDrag.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.renderNote = this.renderNote.bind(this);
  }

  onDrag(event, position) {
    this.props.updateNote(this.props.id, { x: position.x, y: position.y });
  }

  onDeleteClick(event) {
    this.props.deleteNote(this.props.id);
  }

  onEditClick(event) {
    this.setState({ isEditing: !this.state.isEditing });
  }

  onTitleChange(event) {
    this.props.updateNote(this.props.id, { title: event.target.value });
  }

  onTextChange(event) {
    this.props.updateNote(this.props.id, { text: event.target.value });
  }

  renderNote() {
    const editButton = this.state.isEditing ?
      <div onClick={this.onEditClick}><i className="icon fas fa-check" /></div> :
      <span onClick={this.onEditClick}><i className="icon fas fa-edit" /></span>;

    const noteTitle = this.state.isEditing ?
      <input onChange={this.onTitleChange} className="note-title" value={this.props.note.title} /> :
      <div className="note-title">{this.props.note.title}</div>;

    const noteContent = this.state.isEditing ?
      <textarea onChange={this.onTextChange} className="note-content" value={this.props.note.text} /> :
      <div className="note-content" dangerouslySetInnerHTML={{ __html: marked(this.props.note.text || '') }} />;

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
          <div className="note-title-area">
            { noteTitle }
            <div className="icons">
              { editButton }
              <span onClick={this.onDeleteClick}><i className="icon fa fa-trash-alt" /></span>
              <span onDrag={this.onDrag} ><i className="note-mover icon fas fa-arrows-alt" /></span>
            </div>
          </div>
          { noteContent }
        </div>
      </Draggable>
    );
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
