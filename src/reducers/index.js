import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form'

import authReducer from './auth_reducer'
import TicketReducer from './ticket_reducer'

const rootReducer = combineReducers({
  form: form,
  auth: authReducer,
  ticket: TicketReducer
});

export default rootReducer;
