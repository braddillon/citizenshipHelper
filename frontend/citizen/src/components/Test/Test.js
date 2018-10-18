import React, { Component } from 'react';
import Question from './Question';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import ReportCard from './ReportCard';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit
    },
    input: {
        display: 'none'
    }
});

class Test extends Component {
    state = {
        complete: false,
        review: false,
        submitted: false,
        endTime: 0,
        correct: 0,
        answeredQuestions: Object.keys(this.props.questions).reduce(
            (obj, key) => {
                obj[key] = 0;
                return obj;
            },
            {}
        )
    };

    onAnswerQuestion = (questionId, answerId, correct) => {
        this.setState(
            prevState => {
                let tmp = { ...prevState.answeredQuestions };
                tmp[questionId] = answerId;

                let newCorrect = prevState.correct;
                if (correct === true) newCorrect = newCorrect + 1;

                // Check if all questions answered.
                let remainingQuestions = Object.keys(tmp).reduce(
                    (left, key) => {
                        if (tmp[key] === 0) return left + 1;
                        return left;
                    },
                    0
                );

                if (remainingQuestions === 0) {
                    return {
                        answeredQuestions: tmp,
                        complete: true,
                        endTime: moment().unix(),
                        correct: newCorrect
                    };
                } else return { answeredQuestions: tmp, correct: newCorrect };
            },
            () => {
                if (this.state.complete === true) {
                    this.props.onSubmit2(
                        this.state.answeredQuestions,
                        this.state.endTime - this.props.startTime
                    );
                }
            }
        );
    };

    render() {
        //const { classes } = this.props;

        let question = null;
        if (Object.keys(this.props.questions).length > 0) {
            question = Object.keys(this.props.questions).map(id => (
                <Question
                    key={id}
                    {...this.props.questions[id]}
                    complete={this.state.complete}
                    review={this.state.review}
                    onAnswer={this.onAnswerQuestion}
                />
            ));
        }

        let footer = <div />;

        if (this.state.complete === true) {
            let duration = this.state.endTime - this.props.startTime;
            let minutes = Math.floor(duration / 60);
            let seconds = duration % 60;
            let durationString = `${minutes}m ${seconds}s`;
            if (minutes === 0) durationString = `${seconds} seconds`;

            let result = Math.round(
                (this.state.correct /
                    Object.keys(this.props.questions).length) *
                    100,
                0
            );

            footer = (
                <ReportCard
                    result={result}
                    review={this.state.review}
                    duration={durationString}
                    onReview={() => {
                        this.setState(prevState => ({
                            review: !prevState.review
                        }));
                    }}
                    onFinish={this.props.onFinishReview}
                />
            );
        }

        return (
            <div>
                {footer}
                {question}
            </div>
        );
    }
}

export default withStyles(styles)(Test);
