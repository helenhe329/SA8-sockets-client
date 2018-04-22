import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBzFzGTsbqHdzy5peNnM8fxUD9nQEEi6IA',
  authDomain: 'react-notes-75b48.firebaseapp.com',
  databaseURL: 'https://react-notes-75b48.firebaseio.com',
  projectId: 'react-notes-75b48',
  storageBucket: 'react-notes-75b48.appspot.com',
  messagingSenderId: '1044871508380',
};
firebase.initializeApp(config);

export function fetchNotes(callback) {
  firebase.database().ref('notes').on('value', (snapshot) => {
    const newNoteState = snapshot.val();
    callback(newNoteState);
  });
}

export function addNote(title) {
  const id = firebase.database().ref().child('notes').push().key;
  firebase.database().ref('notes').child(id).set({
    title, text: '', x: 20, y: 20,
  });
}

export function deleteNote(id) {
  firebase.database().ref('notes').child(id).remove();
}

export function updateNote(id, fields) {
  console.log(id, fields);
  firebase.database().ref('notes').child(id).update(fields);
}
