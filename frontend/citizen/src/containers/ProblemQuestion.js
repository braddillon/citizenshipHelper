import React, { Component } from 'react';

import axios from 'axios';
import { ROOT_URL } from '../actions/index';
import { connect } from 'react-redux';


import ProblemQuestion from '../components/ProblemQuestion/ProblemQuestion';

class ProblemQuestionContainer extends Component {
    state = {
        probQuestions: [],
        loaded: false
    };

    componentDidMount() {
        axios
            .get(`${ROOT_URL}/getProblemQuestions`, {
                headers: {
                    Authorization: 'JWT ' + localStorage.getItem('token')
                }
            })
            .then(response => {
                this.setState({ probQuestions: response.data, loaded: true });
            });
    }

    render() {
        return (
            <div>
                <ProblemQuestion probQuestions={this.state.probQuestions} sections={this.props.sections} loaded={this.state.loaded}/>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    sections: state.sections,
});

export default connect(mapStateToProps, null)(ProblemQuestionContainer);
