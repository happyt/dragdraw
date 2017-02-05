import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBEV_nobmOnrlLgx4dq34U5X2ZeV7H4BNE",
  authDomain: "draw-6bba6.firebaseapp.com",
  databaseURL: "https://draw-6bba6.firebaseio.com",
  storageBucket: "draw-6bba6.appspot.com",
  messagingSenderId: "393848162065"
};
//  firebase.initializeApp(config);

const fb = firebase
  .initializeApp(config)
  .database()
  .ref();

// Add some "action" functions
// These will update our firebase database
const addPlayer = data => fb.child('players').push(data, response => response);
const updatePlayer = (id, data) => fb.child(`players/${id}`).update(data, response => response);
const actions = {
  addPlayer,
  updatePlayer
};

fb.on('value', snapshot => {
  const store = snapshot.val();
  ReactDOM.render(
    <App {...actions}{...store} />
    ,
    document.getElementById('root')
  );
});

