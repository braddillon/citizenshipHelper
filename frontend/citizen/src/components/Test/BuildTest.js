import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
//import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1
    },
    formControl: {
        margin: theme.spacing.unit
    },
    group: {
        margin: `${theme.spacing.unit}px 0`
    },
    button: {
        margin: theme.spacing.unit
    },
    input: {
        display: 'none'
    },
    chips: {
        display: 'flex',
        flexDirection: 'column'
    },
    chip: {
        margin: theme.spacing.unit / 4
    },
    selectLabel: {
        minWidth: '80px'
    },
    selectBox: {
        minWidth: '200px'
    }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 450
        }
    }
};

class BuildTest extends Component {
    state = {
        value: '10',
        name: []
    };

    handleChange = event => {
        this.setState({ value: event.target.value });
    };

    handleFilterChange = event => {
        this.setState({ name: event.target.value });
    };

    handleSubmit = () => {
        this.props.onBuild(parseInt(this.state.value, 10), this.state.name);
    };

    render() {
        const { classes } = this.props;

        return (
            <Grid container direction="column" alignItems="flex-start" spacing={16}>
                <Grid item>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">Test Size</FormLabel>
                        <RadioGroup aria-label="Number of Questions" name="questions" className={classes.group} value={this.state.value} onChange={this.handleChange}>
                            <FormControlLabel value="10" control={<Radio />} label="10" />
                            <FormControlLabel value="20" control={<Radio />} label="20" />
                            <FormControlLabel value="50" control={<Radio />} label="50" />
                            <FormControlLabel value="100" control={<Radio />} label="100" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="select-multiple-chip">
                            Topic Filter (optional)
                        </InputLabel>
                        <Select
                            multiple
                            value={this.state.name}
                            onChange={this.handleFilterChange}
                            className={classes.selectBox}
                            input={<Input id="select-multiple-chip" />}
                            renderValue={selected => (
                                <div className={classes.chips}>
                                    {selected.map(value => (
                                        <Chip key={value} label={this.props.sections[value].name} className={classes.chip} />
                                    ))}
                                </div>
                            )}
                            MenuProps={MenuProps}
                        >
                            {Object.keys(this.props.sections).map(id => (
                                <MenuItem key={id} value={id}>
                                    {this.props.sections[id].name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" className={classes.button} onClick={this.handleSubmit}>
                        Build Test
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(BuildTest);
