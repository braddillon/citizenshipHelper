import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import QuestionBuilderMC from '../../containers/Forms/QuestionBuilderMultiChoice';
import QuestionBuilderTrueFalse from '../../containers/Forms/QuestionBuilderTrueFalse';

import QuestionApprovalList from './QuestionApprovalList';

// import moment from 'moment';

// const CustomTableCell = withStyles(theme => ({
//     head: {
//         backgroundColor: '#f44336',
//         color: theme.palette.common.white
//     },
//     body: {
//         fontSize: 18
//     }
// }))(TableCell);

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto'
    }
});

class QuestionApproval extends Component {
    state = {
        selectedQuestion: 0
    };

    onClick = key => {
        this.setState({ selectedQuestion: key });
    };

    resetClick = () => {
        this.setState({ selectedQuestion: 0 });
    }

    render() {
        //const { classes } = this.props;
        if (Object.keys(this.props.proposedQuestions).length === 0) return <div>There are no proposed questions</div>;
        else if (this.state.selectedQuestion === 0)
            return <QuestionApprovalList onClick={this.onClick} selectedQuestion={this.state.selectedQuestion} proposedQuestions={this.props.proposedQuestions} sections={this.props.sections} />;
        else {
            let item = this.props.proposedQuestions[this.state.selectedQuestion];

            if (item.multiChoice === true)
                return (
                    <QuestionBuilderMC initialValues={{
                        section: String(item.section),
                        question: item.question,
                        correctAnswer: item.correctAnswer,
                        fakeAnswer1: item.fakeAnswer1,
                        fakeAnswer2: item.fakeAnswer2,
                        fakeAnswer3: item.fakeAnswer3
                    }} proposedQuestionId={item.id} submitter={item.submitter} approval={true} resetClick={this.resetClick}/>

                );
            else
                return (
                    <QuestionBuilderTrueFalse initialValues={{
                        section: String(item.section),
                        question: item.question,
                        answer: item.correctAnswer === 'True' ? 1 : 0,
                    }} proposedQuestionId={item.id} submitter={item.submitter} approval={true} resetClick={this.resetClick}/>

                );
        }
    }
}

export default withStyles(styles)(QuestionApproval);
