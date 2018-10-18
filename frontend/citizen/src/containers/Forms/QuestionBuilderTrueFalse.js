import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
// import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/core/styles';

import renderTextField from "../../components/formHelper/renderTextField";
import renderCombobox from "../../components/formHelper/renderCombobox";
import MenuItem from '@material-ui/core/MenuItem';
import { submitTrueFalseQuestion } from "../../actions";

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
    padding: 10
  },
  combobox: {
    width: '100%'
  }

});

class QuestionBuilderTrueFalse extends Component {
  submitForm = ({ section, question, answer }) => {
    let submitter = ''
    let proposedQuestionId = ''
    if ('submitter' in this.props)
      submitter = this.props.submitter
    if ('proposedQuestionId' in this.props)
      proposedQuestionId = this.props.proposedQuestionId
    
    this.props.submitTrueFalseQuestion(section, question, answer, submitter, proposedQuestionId);
  };

  render() {
    const { handleSubmit, classes } = this.props;

    return (
      <Grid container spacing={16} direction="row" justify="flex-start" style={{ minHeight: "100vh" }}>
        <Grid item xs={12} lg={8}>
          <Paper className={classes.paper}>
            {/* <Typography variant="display1" color="primary" className={classes.title}>
              True/False Builder
            </Typography> */}
            <form onSubmit={handleSubmit(this.submitForm)}>
              <Grid container spacing={8} direction="column" justify="center">
              <Grid item>
                  <Field name="section" label="Section" className={classes.combobox} component={renderCombobox}>
                    {Object.keys(this.props.sections).map(key => (
                      <MenuItem key={key} value={key}>{this.props.sections[key].name}</MenuItem>  
                    ))}
                  </Field>
                </Grid>
                <Grid item>
                  <Field name="question" label="Question" type="text" component={renderTextField} />
                </Grid>
                <Grid item>
                  <Field name="answer" label="Answer" component={renderCombobox}>
                    <MenuItem value={1}>True</MenuItem>
                    <MenuItem value={0}>False</MenuItem>
                  </Field>
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

function validate(formProps) {
  const errors = {};

  if (!formProps.question) {
    errors.question = "Required";
  } 

  return errors;
}

const QuestionBuilderTrueFalseContainer = reduxForm({
  form: 'QuestionBuilderTF',
  validate: validate,
  //initialValues: {section: '1'}
})(QuestionBuilderTrueFalse)

const mapStateToProps = state => {
  return { errorMessage: state.auth.error,
  sections: state.sections
  };
};

export default withStyles(styles)(connect(mapStateToProps, { submitTrueFalseQuestion })(QuestionBuilderTrueFalseContainer));