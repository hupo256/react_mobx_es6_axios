import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'mobx-react'
import { HashRouter } from 'react-router-dom';

import Store from './store';
import App from './App';

ReactDom.render(
  <Provider { ...Store }>
    <HashRouter>
     <App />
    </HashRouter>
  </Provider>,
  document.querySelector('#root')
);