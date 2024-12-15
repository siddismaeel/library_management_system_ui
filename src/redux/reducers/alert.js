import {SET_ALERT, REMOVE_ALERT} from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ALERT: {
      if (state.filter(i => i.id === action.payload.id).length > 0)
        return state
      else
        return [...state, action.payload];
    }
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== action.payload);
    default:
      return state;
  }
}
