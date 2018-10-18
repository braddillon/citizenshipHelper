import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit
    },
    input: {
        display: 'none'
    },
    checkButton: {
        backgroundColor: 'green',
        margin: 1
    },
    incorrectButton: {
        backgroundColor: 'red',
        margin: 1
    },
    paper: {
        marginTop: 0,
        marginBottom: 1,
        marginLeft: 5,
        marginRight: 5,
        padding: 5,
        textAlign: 'left'
    },

    correct: {
        backgroundColor: '#66BB6A'
    },
    incorrect: {
        backgroundColor: '#E57373'
    },
    radio: {},
    radioSection: {
        marginBottom: 8
    }
});

class Question extends Component {
    state = {
        showAnswer: false,
        completed: false,
        correct: false,
        value: '',
        correctAnswerText: this.props.answers
            .filter(item => {
                return item.correct === true;
            })
            .reduce((x, item) => {
                return (x = x + item.answer);
            }, '')
    };

    correctAnswer = () => {
        this.setState({ showAnswer: false, completed: true, correct: true });
    };

    incorrectAnswer = () => {
        this.setState({ showAnswer: false, completed: true, correct: false });
    };

    handleChange = event => {
        if (this.props.answers[event.target.value].correct === true) this.setState({ value: event.target.value, completed: true, correct: true });
        else this.setState({ value: event.target.value, completed: true, correct: false });
        this.props.onAnswer(this.props.id, this.props.answers[event.target.value].id, this.props.answers[event.target.value].correct);
    };

    render() {
        const { classes } = this.props;
        let paperClasses = [classes.paper].join(' ');
        if (this.state.completed && this.state.correct === true) paperClasses = [classes.paper, classes.correct].join(' ');
        if (this.state.completed && this.state.correct === false) paperClasses = [classes.paper, classes.incorrect].join(' ');
        let answers = Object.keys(this.props.answers).map(id => {
            return <FormControlLabel key={id} value={String(id)} control={<Radio className={classes.radio} />} className={classes.radioSection} label={this.props.answers[id].answer} />;
        });

        if (this.props.complete && !this.props.review)
            return null;

        if (this.state.correct && this.props.review)
            return null;

        return (
                <Paper className={paperClasses} elevation={1}>
                    {this.props.question}
                    <br />
                    {!this.state.completed && (
                        <FormControl>
                            <RadioGroup value={this.state.value} onChange={this.handleChange}>
                                {answers}
                            </RadioGroup>
                        </FormControl>
                    )}

                    {this.state.completed && !this.state.correct && this.props.review && <b>{this.state.correctAnswerText}</b>}
                    <br />
                </Paper>
        );
    }
}

export default withStyles(styles)(Question);
