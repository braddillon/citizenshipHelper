import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import ProblemQuestionItem from './ProblemQuestionItem';
import Spinner from '../UI/Spinner/Spinner';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto'
    },
    table: {
        minWidth: 700
    },
    container: {
        padding: 5
    },
    button: {
        padding: 5
    },
    buttonSection: {
        paddingTop: 10,
        paddingBottom: 20
    },
    missingText: {
        paddingTop: 20,
        fontWeight: 'bold'

    }
});

class ProblemQuestion extends Component {
    state = {
        sortSection: false,
    };

    render() {
        const { classes } = this.props;

        let sectionVariant =
            this.state.sortSection === true ? 'contained' : 'outlined';
        let scoreVariant =
            this.state.sortSection === false ? 'contained' : 'outlined';

        let questions = this.props.probQuestions.sort((x, y) => {
            if (x.score === y.score) {
                if (x.question < y.question) {
                    return -1;
                }
                if (x.question > y.question) {
                    return 1;
                }
                return 0;
            } else {
                return x.score - y.score;
            }
        });


        if (this.state.sortSection === true)
            questions = this.props.probQuestions.sort((x, y) => {
                if (x.section === y.section) {
                    if (x.question < y.question) {
                        return -1;
                    }
                    if (x.question > y.question) {
                        return 1;
                    }
                    return 0;
                } else {
                    return x.section - y.section;
                }
            });

        let body = (<React.Fragment>
            <div className={classes.buttonSection}>
                <Typography variant="body2" gutterBottom>
                    Sort by
                </Typography>
                <Button
                    variant={scoreVariant}
                    color="primary"
                    className={classes.button}
                    size="small"
                    onClick={() => {
                        this.setState({ sortSection: false });
                    }}
                >
                    Problem Score
                </Button>
                <Button
                    variant={sectionVariant}
                    color="primary"
                    className={classes.button}
                    size="small"
                    onClick={() => {
                        this.setState({ sortSection: true });
                    }}
                >
                    Section
                </Button>
            </div>
            {questions.map(row => (
                <div key={row.id} className={classes.container}>
                    <ProblemQuestionItem
                        {...row}
                        section={this.props.sections[row.section].name}
                    />
                </div>
            ))}
            </React.Fragment>)

        if (this.props.loaded === false) {
                console.log("SPINNER")
                body = <Spinner />
            }

        console.log(this.props)
        if (this.props.loaded === true && this.props.probQuestions.length===0) {
            body = <React.Fragment><Typography variant="body2" className={classes.missingText}>It appears we haven't detected any problem questions for you yet...</Typography>
            <Typography variant="body1">Keep doing tests, and check back later (when we have a larger question result pool to analyze).</Typography></React.Fragment>
        }

        
        return (
            <div>
                <Typography variant="title" gutterBottom>
                    Problem Questions
                </Typography>
                <Typography variant="body1" gutterBottom>
                    This page lists the questions that you are consistently
                    getting wrong (wrong more than once with no correct answers
                    to offset). It is recommended that you review the questions
                    that you got wrong here, and go look up the answers in your{' '}
                    <a
                        href="https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/discover-canada/read-online.html"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Discover Canada
                    </a>{' '}
                    handbook
                </Typography>
                {body}
             
            </div> 

                
        );
    }
}

export default withStyles(styles)(ProblemQuestion);
