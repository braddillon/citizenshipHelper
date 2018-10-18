import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
//import registerServiceWorker from './registerServiceWorker';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { applyMiddleware, createStore, compose } from 'redux';
import NetworkService from './actions/network-service';
import { AUTH_USER } from './actions/types';

import thunk from 'redux-thunk';
import { reducers } from './reducers'

import { Provider } from 'react-redux';

const history = createBrowserHistory();

const store = createStore(
      connectRouter(history)(reducers),
      {},
      compose(
        applyMiddleware(
            routerMiddleware(history), 
            thunk
        )
    )
);

// if (process.env.NODE_ENV !== 'production') {
//     const {whyDidYouUpdate} = require('why-did-you-update')
//     whyDidYouUpdate(React)
//   }
  
NetworkService.setupInterceptors(store);

const token = localStorage.getItem('token');
if (token) {
    store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(<Provider store={store}>
<ConnectedRouter history={history}>
                <App />
                </ConnectedRouter>
                </Provider>, document.getElementById('root'));
serviceWorker.unregister();