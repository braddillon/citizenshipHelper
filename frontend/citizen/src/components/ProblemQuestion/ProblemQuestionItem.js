import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    questionText: {
        marginBottom: 0,
    }
});

const ProblemQuestionItem = props => {
    const { question, section, id } = props;

    return (
        <Grid key={id} container spacing={0}>
            <Grid item xs={12} md={12}>
                <Typography variant="body1">
                    {question}
                </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
                <Typography variant="caption" gutterBottom>
                    {section}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default withStyles(styles)(ProblemQuestionItem);
