import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

//Redux
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxPromise from 'redux-promise'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers'


const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(ReduxPromise)
))


//Import sass
import './main.scss';

ReactDOM.render(
  <Provider store={store}>
  <App />
  </Provider>
  ,
  document.getElementById('root')
);
