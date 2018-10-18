import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit
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
    correctAnswer: {
        color: '#66BB6A',
        marginLeft: 15,
        fontWeight: 'bold',
    },
    incorrectAnswer: {
        color: '#E57373',
        marginLeft: 15,
        textDecoration: 'line-through',
        fontWeight: 'bold',
    }
});

class TestLogGranular extends Component {
    componentWillUnmount() {
        this.props.onReset();
    }

    render() {
        const { classes } = this.props;

        let questions = Object.keys(this.props.testLog).map( id => {
            return (
            <Paper className={classes.paper} key={id}>
                {this.props.testLog[id].question}
                { this.props.testLog[id].correct === true ?
                    <Typography className={classes.correctAnswer} variant="subheading" gutterBottom>
                    {this.props.testLog[id].answer}
                    </Typography>
                    :
                    <div>
                    <Typography className={classes.incorrectAnswer} variant="subheading" gutterBottom>
                    {this.props.testLog[id].answer}
                    </Typography>
                    <Typography className={classes.correctAnswer} variant="subheading" gutterBottom>
                    {this.props.testLog[id].correctAnswer}
                    </Typography>
                    </div>
                }

            </Paper>
            )
        })

        return (
            <div>
                {questions}
                <Button variant="contained" color="primary" className={classes.button} onClick={this.props.onReset}>
                    Cancel
                </Button>
            </div>
        );
    }
}

export default withStyles(styles)(TestLogGranular);
