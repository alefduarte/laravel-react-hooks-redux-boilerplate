import { combineReducers } from 'redux';
import auth from './auth';
import users from './users';
import password from './password';
import activate from './activate';


export default combineReducers({
  auth,
  users,
  password,
  activate
});
