import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Spinner from '../UI/Spinner/Spinner';

import moment from 'moment';

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

class TestLog extends Component {
    render() {
        const { classes } = this.props;

        // if (Object.keys(this.props.tests).length === 0) return <div>You haven't taken any tests</div>;
        if (Object.keys(this.props.tests).length === 0) return <Spinner />;
        else
            return (
                <Grid container className={classes.root} spacing={16}>
                    <Grid item xs={12} lg={8} xl={6}>
                        <Paper className={classes.root}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <CustomTableCell>Date</CustomTableCell>
                                        <CustomTableCell numeric>Duration</CustomTableCell>
                                        <CustomTableCell numeric>Result</CustomTableCell>
                                        <CustomTableCell numeric>Percentage</CustomTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Object.keys(this.props.tests)
                                        .sort((a, b) => moment(this.props.tests[b].testing_date).toDate() - moment(this.props.tests[a].testing_date).toDate())
                                        .map(key => {
                                        //let datestring = moment(Math.round(parseInt(key, 10) / 1000000)).format('MMMM Do, h:mm A');
                                        let datestring = moment(this.props.tests[key].testing_date).format('MMMM Do, h:mm A');
                                        let pct = Math.round((parseInt(this.props.tests[key].correctAnswers, 10) / parseInt(this.props.tests[key].totalQuestions, 10)) * 100, 0);

                                        let minutes = Math.floor(this.props.tests[key].duration / 60);
                                        let seconds = this.props.tests[key].duration%60;

                                        return (
                                            <TableRow key={key} onClick={() => this.props.onClick(key)}>
                                                <TableCell component="th" scope="row">
                                                    {datestring}
                                                </TableCell>
                                                <TableCell numeric>
                                                    {minutes}m {seconds}s
                                                </TableCell>
                                                <TableCell numeric>
                                                    {this.props.tests[key].correctAnswers}/{this.props.tests[key].totalQuestions}
                                                </TableCell>
                                                <TableCell numeric>{pct}%</TableCell>
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

export default withStyles(styles)(TestLog);
