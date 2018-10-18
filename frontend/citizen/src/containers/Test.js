import React, { Component } from 'react';
import { connect } from 'react-redux';
import { buildTest, cancelTest, saveTest, submitTest, resetTest, finishTestReview } from '../actions';

import BuildTest from '../components/Test/BuildTest';
import Test from '../components/Test/Test';
import moment from 'moment';

class TestContainer extends Component {
    state = {
        init: false,
        startTime: 0
    };

    componentDidMount() {
        if (this.props.sections === null) this.props.fetchSections();
    }

    componentWillUnmount() {
        this.props.resetTest();
    }

    buildTest = (questions, filters) => {
        this.props.buildTest(questions, filters);
        this.setState({ init: true, startTime: moment().unix() });
    };

    render() {
        return (
            <div>
                {this.props.flags.testInitialized === false ? (
                    <BuildTest sections={this.props.sections} onBuild={this.buildTest} />
                ) : (
                    <Test questions={this.props.questions} onCancel={this.props.cancelTest} onSave={this.props.saveTest} onSubmit2={this.props.submitTest} startTime={this.state.startTime} onFinishReview={this.props.finishTestReview}/>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    questions: state.questions,
    sections: state.sections,
    flags: state.flags
});

const mapDispatchToProps = {
    buildTest,
    cancelTest,
    saveTest,
    submitTest,
    resetTest,
    finishTestReview
};

const TestContainer2 = connect(
    mapStateToProps,
    mapDispatchToProps
)(TestContainer);

export default TestContainer2;
