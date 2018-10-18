import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import QuestionBuilderMC from '../../containers/Forms/QuestionBuilderMultiChoice';
import QuestionBuilderTrueFalse from '../../containers/Forms/QuestionBuilderTrueFalse';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%'
    },
    menu: {
        width: 200
    },
    button: {
        marginTop: 10,
        marginBottom: 10
    },
    grid: {
        backgroundColor: 'blue'
    }
    
});

class QuestionBuilder extends Component {
    state = {
        trueFalse: false
    };

    render() {
        const { classes } = this.props;
        let button1Variant = 'contained'
        let button2Variant = 'outlined'

        if (this.state.trueFalse === true) {
            button1Variant = 'outlined'
            button2Variant = 'contained'
        } else {

            button1Variant = 'contained'
            button2Variant = 'outlined'
        }

        return (
           
                <div>
                     <Grid container  direction="row" alignItems="flex-start" spacing={16}>
                <Button variant={button1Variant} color="primary" className={classes.button} onClick={() => {this.setState({trueFalse:false})}}>
                    Multiple Choice
                </Button>
                <Button variant={button2Variant} color="primary" className={classes.button} onClick={() => {this.setState({trueFalse:true})}}>
                    True/False
                </Button>
                </Grid>
                { this.state.trueFalse === false ?
                <QuestionBuilderMC initialValues= {{section: '1'}}  /> :
                <QuestionBuilderTrueFalse initialValues= {{section: '1'}} />
                }
                </div>

            
        );
    }
}

export default withStyles(styles)(QuestionBuilder);
