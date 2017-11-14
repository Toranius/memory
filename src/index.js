import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

import App from './App';
import rootReducer from './rootReducer';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
  , document.getElementById('root')
);
registerServiceWorker();
