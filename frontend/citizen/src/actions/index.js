import { CLEAR_QUESTIONS, FETCH_ACCOUNT, FETCH_QUESTIONS, FETCH_SECTIONS, FLAG_TEST_INITIALIZED, FETCH_TEST_LOG_SUMMARY, FETCH_TEST_LOG_GRANULAR, TEST_LOG_CLEAR_GRANULAR, FETCH_PROPOSED_QUESTIONS } from './types.js'
import { push } from 'connected-react-router';

import axios from 'axios';
import _ from 'lodash';
//export const ROOT_URL = `http://localhost:8000/api`;

export let ROOT_URL;

if (window.location.host.includes('codesoldier')) {
	ROOT_URL = `https://${window.location.host}/api`;
} else {
	let chunks = window.location.host.split(':');
	ROOT_URL = `http://` + chunks[0] + `/api`;
}


export const fetchQuestions = () => {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/questions`, {
            headers: {
                Authorization: 'JWT ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                let myObject = response.data.reduce((obj, item) => {
                    item.answers = _.shuffle(item.answers);
                    
                    obj[item.id] = item;

                    return obj;
                }, {});

                dispatch({ type: FETCH_QUESTIONS, payload: {...myObject} });
            });
    };
};

export const fetchSections = () => {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/sections`, {
            headers: {
                Authorization: 'JWT ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                let myObject = response.data.reduce((obj, item) => {
                    obj[item.id] = item;
                    return obj;
                }, {});

                dispatch({ type: FETCH_SECTIONS, payload: {...myObject} });
            });
    };
};

export const fetchAccount = () => {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/user`, {
            headers: {
                Authorization: 'JWT ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                dispatch({ type: FETCH_ACCOUNT, payload: response.data });
            });
    };
};


export const fetchTestLogSummary = () => {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/testLogSummary`, {
            headers: {
                Authorization: 'JWT ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                // Object.keys(response.data).forEach( key => {
                //     response.data[key].id = parseInt(key, 10)
                // })
                let myObject = response.data.reduce((obj, item) => {
                    obj[item.id] = item;
                    return obj;
                }, {});

                dispatch({ type: FETCH_TEST_LOG_SUMMARY, payload: myObject });
            });
    };
};

export const fetchTestLogGranular = (id) => {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/testLogGranular`, {id: id}, {
            headers: {
                Authorization: 'JWT ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                dispatch({ type: FETCH_TEST_LOG_GRANULAR, payload: response.data });
            });
    };
};

export const fetchQuestionSubmissions = () => {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/proposedQuestions`, {
            headers: {
                Authorization: 'JWT ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                let myObject = response.data.reduce((obj, item) => {
                    obj[item.id] = item;
                    return obj;
                }, {});

                dispatch({ type: FETCH_PROPOSED_QUESTIONS, payload: {...myObject} });
            });
    };
};

export const clearTestLogGranular = () => {
    return function(dispatch) {
        dispatch({ type: TEST_LOG_CLEAR_GRANULAR, payload: '' });
    };
};

export const submitMultiChoiceQuestion = (section, question, correctAnswer, fakeAnswer1, fakeAnswer2, fakeAnswer3, submitter, proposedQuestionId) => {
    return function(dispatch) {
        console.log("submitMultiChoiceQuestion!");
        axios
            .post(`${ROOT_URL}/createMultipleChoiceQuestion`, {section, question, correctAnswer, fakeAnswer1, fakeAnswer2, fakeAnswer3, submitter, proposedQuestionId}, {
                headers: {
                    Authorization: 'JWT ' + localStorage.getItem('token')
                }
            })
        dispatch(push('/'));
    };
}

export const submitTrueFalseQuestion = (section, question, answer, submitter, proposedQuestionId) => {
    return function(dispatch) {
        console.log("submitTrueFalseQuestion!");
        console.log(submitter);
        if (answer === 1)
            answer = 'True'
        else
            answer = 'False'
        axios
            .post(`${ROOT_URL}/createTrueFalseQuestion`, {section, question, answer, submitter, proposedQuestionId}, {
                headers: {
                    Authorization: 'JWT ' + localStorage.getItem('token')
                }
            })
        dispatch(push('/'));
    };
}

export const buildTest = (questions, filters) => {
    return function(dispatch) {
        axios
            .post(`${ROOT_URL}/buildTest`, {questions: questions, filters:filters}, {
                headers: {
                    Authorization: 'JWT ' + localStorage.getItem('token')
                }
            }).then(response => {
                let myObject = response.data.reduce((obj, item) => {
                    if (item.answers.length === 2) {
                        if (item.answers[0].answer === 'False') {
                            // need to swap
                            let tmp = item.answers[0]
                            item.answers[0] = item.answers[1]
                            item.answers[1] = tmp
                        }
                    } else {
                        item.answers = _.shuffle(item.answers);
                    }

                    obj[item.id] = item;

                    return obj;
                }, {});

                dispatch({ type: FETCH_QUESTIONS, payload: {...myObject} });
            }).then(() => {
                dispatch({ type: FLAG_TEST_INITIALIZED, payload: true });
                
            });
    }
}

export const resetTest = () => {
    return function(dispatch) {
        dispatch({ type: FLAG_TEST_INITIALIZED, payload: false})
        dispatch({ type: CLEAR_QUESTIONS, payload: true });
    }
}

export const submitTest = (answers, duration) => {
    return function(dispatch) {
        axios
            .post(`${ROOT_URL}/submitTest`, {questions: answers, duration: duration}, {
                headers: {
                    Authorization: 'JWT ' + localStorage.getItem('token')
                }
            }).then(response => {
                //console.log(response);
                //dispatch({ type: FLAG_TEST_INITIALIZED, payload: false });
                //dispatch({ type: FETCH_QUESTIONS, payload: {} });
                //dispatch(push('/'));
            });
    }
}

export const finishTestReview = () => {
    return function(dispatch) {
        dispatch({ type: FLAG_TEST_INITIALIZED, payload: false });
        dispatch({ type: FETCH_QUESTIONS, payload: {} });
    }
}

export const cancelTest = () => {
    return function(dispatch) {
        dispatch({ type: FLAG_TEST_INITIALIZED, payload: false });
        dispatch({ type: FETCH_QUESTIONS, payload: {} });
    }
}

export const saveTest = () => {
    return function(dispatch) {
        dispatch({ type: FLAG_TEST_INITIALIZED, payload: false });
        dispatch({ type: FETCH_QUESTIONS, payload: {} });
    }
}
