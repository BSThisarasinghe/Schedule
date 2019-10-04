import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './reducers';
import Router from './Router';

class App extends Component {

  UNSAFE_componentWillMount() {
    const firebaseConfig = {
      apiKey: 'AIzaSyD1GaMqvtyB2F0hxuBNzRJRCm6ubT8sm-A',
      authDomain: 'schedule-38c0c.firebaseapp.com',
      databaseURL: 'https://schedule-38c0c.firebaseio.com',
      projectId: 'schedule-38c0c',
      storageBucket: '',
      messagingSenderId: '559776738194',
      appId: '1:559776738194:web:c9683ce36c7c640f752f4b',
      measurementId: 'G-8YLV2M8LZQ'
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
