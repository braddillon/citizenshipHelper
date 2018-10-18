import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: '#f44336',
        color: theme.palette.common.white
    },
    body: {
        fontSize: 18
    }
}))(TableCell);

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto'
    }
});

class QuestionApprovalList extends Component {

    render() {
        const { classes } = this.props;
          
        return (
        <Grid container className={classes.root} spacing={16}>
            <Grid item xs={12} lg={8} xl={6}>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <CustomTableCell>Question</CustomTableCell>
                                <CustomTableCell>Section</CustomTableCell>
                                <CustomTableCell>Submitted By</CustomTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.keys(this.props.proposedQuestions).map(key => {
                                return (
                                    <TableRow key={key} onClick={() => this.props.onClick(key)}>
                                        <TableCell component="th" scope="row">
                                            {this.props.proposedQuestions[key].question}
                                        </TableCell>
                                        <TableCell>{this.props.sections[parseInt(this.props.proposedQuestions[key].section, 10)].name}</TableCell>
                                        <TableCell>{this.props.proposedQuestions[key].submitter}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
        </Grid>
        );
    }
}

export default withStyles(styles)(QuestionApprovalList);
