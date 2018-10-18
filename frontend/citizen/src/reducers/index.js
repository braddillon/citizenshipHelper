import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import questionReducer from './questions';
import sectionReducer from './sections';
import authReducer from './auth';
import accountReducer from './account';
import flagReducer from './flags';
import testLogReducer from './testLog';
import proposedQuestionReducer from './proposedQuestions';

export const reducers = combineReducers({
  form: formReducer,
  questions: questionReducer,
  auth: authReducer,
  account: accountReducer,
  sections: sectionReducer,
  flags: flagReducer,
  testLog: testLogReducer,
  proposedQuestions: proposedQuestionReducer,
});