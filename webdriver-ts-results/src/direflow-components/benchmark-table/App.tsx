import React from 'react';
import AppComponent from '../../App';
import {Provider} from 'react-redux'
import { createStore } from 'redux'
import { reducer } from '../../reducer';

const store = createStore(reducer)

const App = () => {
  return (
    <Provider store={store}>
      <AppComponent/>
    </Provider>
  );
}

export default App;
