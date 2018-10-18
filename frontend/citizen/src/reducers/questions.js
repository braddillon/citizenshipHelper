import { FETCH_QUESTIONS, CLEAR_QUESTIONS } from '../actions/types';

//const initialState = { workout: {}, exercise: {}, exerciseTypes: {} };

export default function(state = {}, action) {
    switch (action.type) {
        case FETCH_QUESTIONS:
            return action.payload;
        case CLEAR_QUESTIONS:
            return {};
        default:
            return state;
    }
}
