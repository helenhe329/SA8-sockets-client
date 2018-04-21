import React, { Component } from 'react';

class NewNoteBar extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.onCreate = this.onCreate.bind(this);
  }

  onInputChange(event) {
    this.setState({ title: event.target.value });
  }

  onCreate(event) {
    this.props.addNote(this.state.title);
    this.setState({ title: '' });
  }

  render() {
    return (
      <div id="new-note-bar">
        <input type="text" name="title" placeholder="New note title" onChange={this.onInputChange} value={this.state.title} />
        <button onClick={this.onCreate}>Create</button>
      </div>
    );
  }
}

export default NewNoteBar;
