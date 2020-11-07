import { combineReducers } from 'redux';
import {
  SET_CARGANDO
} from './actions';

function cargandoReducer(state = false, action) {
  if (action.type === SET_CARGANDO) {
    return action.payload;
  }
  return state;
}

const RootReducer = combineReducers({
  cargando: cargandoReducer
});

export default RootReducer;
