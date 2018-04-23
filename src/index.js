import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import Note from './components/note';
import NewNoteBar from './components/new_note_bar';
import * as db from './services/datastore';
import './style.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: Immutable.Map(),
      zIndexCounter: 0,
    };
    this.addNote = this.addNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  componentDidMount() {
    db.fetchNotes((notes) => {
      this.setState({ notes: Immutable.Map(notes) });
    });
  }

  addNote(title) {
    db.addNote(title);
    this.setState({ zIndexCounter: this.state.zIndexCounter + 1 });
  }

  updateNote(id, fields) {
    db.updateNote(id, Object.assign({}, this.state.notes.get(id), fields));
  }

  deleteNote(id) {
    db.deleteNote(id);
  }

  render() {
    return (
      <div id="notepad">
        <NewNoteBar addNote={title => this.addNote(title)} />
        <div id="notes">
          {this.state.notes.entrySeq().map(([id, note]) => {
            return (<Note key={id}
              id={id}
              note={note}
              zIndexCounter={this.state.zIndexCounter}
              updateNote={this.updateNote}
              deleteNote={this.deleteNote}
            />);
          })}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
