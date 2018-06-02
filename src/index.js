import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import io from 'socket.io-client';
import Note from './components/note';
import NewNoteBar from './components/new_note_bar';
// import * as db from './services/datastore';
import './style.scss';

const socketserver = 'http://localhost:9090';

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
    this.socket = io(socketserver);
    this.socket.on('connect', () => { console.log('socket.io connected'); });
    this.socket.on('disconnect', () => { console.log('socket.io disconnected'); });
    this.socket.on('reconnect', () => { console.log('socket.io reconnected'); });
    this.socket.on('error', (error) => { console.log(error); });
  }

  componentDidMount() {
    this.socket.on('notes', (notes) => {
      this.setState({ notes: Immutable.Map(notes) });
    });
  }

  addNote(title) {
    this.socket.emit('createNote', title);
    this.setState({ zIndexCounter: this.state.zIndexCounter + 1 });
  }

  updateNote(id, fields) {
    this.socket.emit('updateNote', id, fields);
  }

  deleteNote(id) {
    this.socket.emit('deleteNote', id);
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
