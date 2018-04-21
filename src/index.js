import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import Note from './components/note';
import NewNoteBar from './components/new_note_bar';
import './style.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: Immutable.Map(),
      counter: 0,
    };
    this.addNote = this.addNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  addNote(title) {
    const note = {
      title,
      text: '',
      x: 20,
      y: 20,
      zIndex: 0,
    };
    this.setState({
      notes: this.state.notes.set(this.state.counter, note),
    });
    this.setState({
      counter: this.state.counter + 1,
    });

    console.log(note);
  }

  updateNote(id, fields) {
    this.setState({
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, fields); }),
    });
  }

  deleteNote(id) {
    this.setState({
      notes: this.state.notes.delete(id),
    });
  }

  render() {
    return (
      <div id="notepad">
        <NewNoteBar addNote={title => this.addNote(title)} />
        <div id="notes">
          {this.state.notes.entrySeq().map(([id, note]) => {
            return <Note key={id} id={id} note={note} updateNote={this.updateNote} deleteNote={this.deleteNote} />;
          })}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
