import { FLAG_TEST_INITIALIZED } from '../actions/types';

const initialState = { testInitialized: false };

export default function(state = initialState, action) {
    switch (action.type) {
        case FLAG_TEST_INITIALIZED:
            return {...state, testInitialized: action.payload};
        default:
            return state;
    }
}
