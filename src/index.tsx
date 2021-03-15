import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { brightWallModelReducer } from './model';

import App from './component/App';

// const platform = getPlatform();
// console.log(platform);

const store = createStore(
  brightWallModelReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

const divStyle = {
  height: '1080px',
};

ReactDOM.render(
  <Provider store={store}>
    <div style={divStyle}>
      <App />
    </div>
  </Provider>,
  document.getElementById('content') as HTMLElement
);
