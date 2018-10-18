import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
//import { formValueSelector } from 'redux-form';

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
// import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/core/styles';

import renderTextField from "../../components/formHelper/renderTextField";
import renderCombobox from "../../components/formHelper/renderCombobox";
import MenuItem from '@material-ui/core/MenuItem';
import { submitMultiChoiceQuestion } from "../../actions";

const styles = theme => ({
  title: {
    marginBottom: 5,
  },
  button: {
    marginTop: 10,
    marginRight: 10,
  },
  errorMessage: {
    color: 'white',
  },
  paper: {
    padding: 10,
  },
  combobox: {
    width: '100%'
  },
});

class MultiChoiceQuestionBuilder extends Component {
  submitForm = ({ section, question, correctAnswer, fakeAnswer1, fakeAnswer2, fakeAnswer3 }) => {
    let submitter = ''
    let proposedQuestionId = ''
    if ('submitter' in this.props)
      submitter = this.props.submitter
    if ('proposedQuestionId' in this.props)
      proposedQuestionId = this.props.proposedQuestionId
    
    this.props.submitMultiChoiceQuestion(section, question, correctAnswer, fakeAnswer1, fakeAnswer2, fakeAnswer3, submitter, proposedQuestionId);
  };

  render() {
    const { handleSubmit, classes } = this.props;
    return (
      <Grid container spacing={16} direction="row" justify="flex-start" style={{ minHeight: "100vh"}}>
        <Grid item xs={12} lg={8}>
          <Paper className={classes.paper}>
            {/* <Typography variant="display1" color="primary" className={classes.title}>
              MultiChoice Builder
            </Typography> */}
            <form onSubmit={handleSubmit(this.submitForm)}>
              <Grid container spacing={8} direction="column" justify="center">
              <Grid item>
                  <Field name="section" label="Section" className={classes.combobox} component={renderCombobox} fullWidth >
                    {Object.keys(this.props.sections).map(key => (
                      <MenuItem key={key} value={key}>{this.props.sections[key].name}</MenuItem>  
                    ))}
                  </Field>
                </Grid>
                <Grid item>
                  <Field name="question" label="Question" type="text" component={renderTextField} fullWidth />
                </Grid>
                <Grid item>
                  <Field name="correctAnswer" label="Correct Answer" component={renderTextField} fullWidth />
                </Grid>
                <Grid item>
                  <Field name="fakeAnswer1" label="Fake Answer 1" component={renderTextField} fullWidth />
                </Grid>
                <Grid item>
                <Field name="fakeAnswer2" label="Fake Answer 2" component={renderTextField} fullWidth />
                </Grid>
                <Grid item>
                <Field name="fakeAnswer3" label="Fake Answer 3" component={renderTextField} fullWidth />
                </Grid>
              </Grid>
              <Grid container justify="flex-end" direction="row">
                <Button variant="contained" color="primary" type="submit" className={classes.button}>
                  Submit
                </Button>
                { this.props.approval && 
                <Button variant="contained" color="primary" className={classes.button} onClick={ () => {
                  this.props.resetClick();
                }}>
                  Cancel
                </Button>
                }
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

// function validate(formProps) {
//   const errors = {};

//   if (!formProps.question) {
//     errors.question = "Required";
//   } else if (!formProps.correctAnswer) {
//       errors.correctAnswer = "Required"
//     } else if (!formProps.fakeAnswer1) {
//         errors.fakeAnswer1 = "Required"
//     } else if (!formProps.fakeAnswer2) {
//         errors.fakeAnswer2 = "Required"
//     } else if (!formProps.fakeAnswer3) {
//         errors.fakeAnswer3 = "Required"
//     }  

//   return errors;
// }

const MultiChoiceQuestionBuilderContainer = reduxForm({
  form: 'QuestionBuilderMC',
  // validate: validate,
  // enableReinitialize: true,
})(MultiChoiceQuestionBuilder)

//const selector = formValueSelector('QuestionBuilderMC')

const mapStateToProps = state => {
  return { 
    errorMessage: state.auth.error,
    sections: state.sections,
    // initialValues: {section: '1'}
    //testMe: selector(state, 'question', 'correctAnswer')
  };
};

export default withStyles(styles)(connect(mapStateToProps, { submitMultiChoiceQuestion })(MultiChoiceQuestionBuilderContainer));