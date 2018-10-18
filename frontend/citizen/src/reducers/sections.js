import { FETCH_SECTIONS } from '../actions/types';

//const initialState = { workout: {}, exercise: {}, exerciseTypes: {} };

export default function(state = {}, action) {
    switch (action.type) {
        case FETCH_SECTIONS:
            return action.payload;
        default:
            return state;
    }
}
