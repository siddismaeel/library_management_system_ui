import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT} from './types';

export const setAlert = (msg, alertType, timeout = 2000) => (dispatch) => {
  const id = uuidv4();
  {
    if (msg === 'Bad Token' || msg=== 'Unknown Requesting User') {
      let errMsg="Session expired";
      dispatch({
        type: SET_ALERT,
        payload: { msg:errMsg, alertType, id:errMsg },
      });
      setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: errMsg }), timeout);
    }else{
      dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id },
      });
    }
  }

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
