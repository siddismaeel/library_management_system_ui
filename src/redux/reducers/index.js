import { combineReducers } from 'redux';
import book from './book';
import alert from './alert';
import { member } from './member';
import transaction from './transaction';
import { dashboard } from './dashboard';
import mainLayout from './mainLayout';

const rootReducer = combineReducers({
  book,
  member,
  transaction,
  dashboard,
  mainLayout,
  alert,
});

export default rootReducer;
