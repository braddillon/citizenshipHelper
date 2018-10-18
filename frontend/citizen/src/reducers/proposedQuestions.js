import { FETCH_PROPOSED_QUESTIONS } from '../actions/types';

//const initialState = { workout: {}, exercise: {}, exerciseTypes: {} };

export default function(state = {}, action) {
    switch (action.type) {
        case FETCH_PROPOSED_QUESTIONS:
            return action.payload;
        default:
            return state;
    }
}
