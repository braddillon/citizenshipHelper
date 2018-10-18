import React, { Component } from 'react';

import { connect } from 'react-redux';
import { fetchQuestionSubmissions } from '../actions';
import QuestionApproval from '../components/QuestionApproval/QuestionApproval';

class QuestionApprovalContainer extends Component {
    componentDidMount() {
        this.props.fetchQuestionSubmissions();
    }

    render() {
        if (Object.keys(this.props.sections).length === 0) {
            return null;
          }
        return (
            <div>
                <QuestionApproval proposedQuestions={this.props.proposedQuestions} sections={this.props.sections} />
            </div>
        );
    }
}


const mapStateToProps = (state, props) => ({
    sections: state.sections,
    proposedQuestions: state.proposedQuestions,
});

const mapDispatchToProps = {
    fetchQuestionSubmissions,
};

const QuestionApprovalContainer2 = connect(
    mapStateToProps,
    mapDispatchToProps
)(QuestionApprovalContainer);

export default QuestionApprovalContainer2;