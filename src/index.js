import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk'

import App from './components/app';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Feature from './components/feature';
import TicketIndex from './components/ticket/ticket_index';
import RequireAuth from './components/auth/require_auth';
import Welcome from './components/welcome'
import TicketNew from './components/ticket/ticket_new'
import TicketShow from './components/ticket/ticket_show'
import TicketEdit from './components/ticket/ticket_edit'

import reducers from './reducers';
import { AUTH_USER } from './actions/types'

const createStoreWithMiddleware = compose(applyMiddleware(reduxThunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore)
const store = createStoreWithMiddleware(reducers)
const token = localStorage.getItem('token')

if (token){
  store.dispatch({ type: AUTH_USER})
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} >
        <IndexRoute component={Welcome} />
        <Route path="signin" component={Signin} />
        <Route path="signout" component={Signout} />
        <Route path="signup" component={Signup} />
        <Route path="ticket" component={RequireAuth(TicketIndex)} >
        
         
          
        </Route>
        <Route path="new" component={TicketNew} />
        <Route path="ticket/:id" component={ TicketShow} />
        <Route path="edit/:id" component={ TicketEdit} />
      </Route>  
    </Router>
  </Provider>
  , document.querySelector('.container'));
