import React, { Component } from 'react';
import Draggable from 'react-draggable';
import marked from 'marked';
import ReactTooltip from 'react-tooltip';

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
    };
    this.onDrag = this.onDrag.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.renderNote = this.renderNote.bind(this);
  }

  onDrag(event, position) {
    console.log(position);
    if (position.x > 0 && position.y > 0) {
      this.props.updateNote(this.props.id, { x: position.x, y: position.y });
    }
  }

  onDragStart(event) {
    this.props.updateNote(this.props.id, { zIndex: 1000 });
  }

  onDragEnd(event) {
    this.props.updateNote(this.props.id, { zIndex: 0 });
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
      <span onClick={this.onEditClick} data-tip data-for="saveChanges"><i className="icon fas fa-check" /></span> :
      <span onClick={this.onEditClick} data-tip data-for="editNote"><i className="icon fas fa-edit" /></span>;

    const editTooltip = this.state.isEditing ?
      <ReactTooltip className="tooltip" id="saveChanges" effect="solid"><span>Save changes</span></ReactTooltip> :
      <ReactTooltip className="tooltip" id="editNote" effect="solid"><span>Edit</span></ReactTooltip>;

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
        onStart={this.onDragStart}
        onStop={this.onDragEnd}
      >
        <div className="note">
          <div className="note-title-area">
            { noteTitle }
            <div className="icons">
              { editButton }
              { editTooltip }
              <span onClick={this.onDeleteClick} data-tip data-for="deleteNote"><i className="icon fa fa-trash-alt" /></span>
              <ReactTooltip className="tooltip" id="deleteNote" effect="solid">
                <span>Delete</span>
              </ReactTooltip>
              <span onDrag={this.onDrag} data-tip data-for="dragNote"><i className="note-mover icon fas fa-arrows-alt" /></span>
              <ReactTooltip className="tooltip" id="dragNote" effect="solid">
                <span>Drag</span>
              </ReactTooltip>
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
