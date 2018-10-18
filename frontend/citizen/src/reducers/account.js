import { FETCH_ACCOUNT, CLEAR_ACCOUNT } from '../actions/types';

// const LOAD = 'redux-form-examples/account/LOAD'

const reducer = (state = {}, action) => {

  switch (action.type) {
    case FETCH_ACCOUNT:
      return action.payload;
    // case FATSECRET_RESET_FETCH_TIME:
    //         return { ...state, fatSecretEpoch: action.payload };
    // case SET_USERNAME:
    //         console.log(action.payload);
    //         return { ...state, username: action.payload };
    // case SET_ROLE:
    //     return { ...state, role: action.payload };
    // case UNAUTH_USER:
    //     return []
    case CLEAR_ACCOUNT:
      return {};
    default:
      return state
  }
}

/**
 * Simulates data loaded into this reducer from somewhere
 */
// export const load = data => ({ type: LOAD, data })
//export const load = data => (console.log(data))

export default reducer

