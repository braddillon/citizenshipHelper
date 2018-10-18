import { FETCH_TEST_LOG_SUMMARY, FETCH_TEST_LOG_GRANULAR, TEST_LOG_CLEAR_GRANULAR } from '../actions/types';

const initialState = { tests: {}, granularLog: {} };

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_TEST_LOG_SUMMARY:
            return { ...state, tests: action.payload};
        case FETCH_TEST_LOG_GRANULAR:
            return { ...state, granularLog: action.payload};
        case TEST_LOG_CLEAR_GRANULAR:
            return { ...state, granularLog: {} };
        default:
            return state;
    }
}
