import React, { Component } from 'react';

import { connect } from 'react-redux';

import { fetchTestLogSummary, fetchTestLogGranular, clearTestLogGranular } from '../actions';

import TestLog from '../components/TestLog/TestLog';
import TestLogGranular from '../components/TestLog/TestLogGranular';

class TestLogContainer extends Component {
    state = {
        granularId: 0
    };

    componentDidMount() {
        this.props.fetchTestLogSummary();
    }

    setGranular = id => {
        this.setState({ granularId: id });
        this.props.fetchTestLogGranular(id);
    };

    resetGranular = () => {
        this.setState({ granularId: 0 });
        this.props.clearTestLogGranular();
    }

    render() {
        return (<div>
        {!this.state.granularId ? 
        <TestLog tests={this.props.testLog.tests} onClick={this.setGranular} /> 
        : 
        <TestLogGranular onReset={this.resetGranular} testLog={this.props.testLog.granularLog} />}
        </div>);
    }
}

const mapStateToProps = (state, props) => ({
    testLog: state.testLog
});

const mapDispatchToProps = {
    fetchTestLogSummary,
    fetchTestLogGranular,
    clearTestLogGranular
};

const TestLogContainer2 = connect(
    mapStateToProps,
    mapDispatchToProps
)(TestLogContainer);

export default TestLogContainer2;
