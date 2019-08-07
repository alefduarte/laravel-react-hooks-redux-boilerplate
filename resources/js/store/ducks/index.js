import { combineReducers } from 'redux';
import auth from './auth';
import users from './users';
import password from './password';


export default combineReducers({
  auth,
  users,
  password
});
