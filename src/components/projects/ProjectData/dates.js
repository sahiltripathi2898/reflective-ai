import 'date-fns';
import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { Paper, Typography } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: '20px',
        marginTop: '50px',
        width: '100%'
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        borderRadius: '10px'
    },
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
}));

export default function MaterialUIPickers() {
    // The first commit of Material-UI
    const [selectedDate, setSelectedDate] = React.useState('10/16/2020');

    const [age, setAge] = React.useState('');
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };


    const handleChange = (event) => {
        setAge(event.target.value);
    };

    // Camera
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const [cameras, setCameras] = useState([]);
    useEffect(() => {
        const data = {
            project_id: localStorage.getItem('pID'),
            jwt_token: localStorage.getItem('jwt_token'),
        };
        axios
            .post(
                'http://ec2-13-56-161-17.us-west-1.compute.amazonaws.com:7789/project/cameras',
                data
            )
            .then((res) => {
                //console.log(res.data)
                setCameras(res.data.cameras);

            })
            .catch((err) => console.log(err));

    }, []);

    const [cameraID, setcameraID] = useState(1);

    const handleClick = (id) => {
        setcameraID(id)
    }

    useEffect(() => {
        localStorage.setItem('cameraID', cameraID)
    }, [cameraID])

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={5}>
                <Grid container spacing={3}>
                    <Grid item md={6} lg={4} xs={12}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-controlled-open-select-label">Select Camera </InputLabel>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                open={open}
                                onClose={handleClose}
                                onOpen={handleOpen}
                                onChange={handleChange}
                                value={age}
                            >
                                {cameras.map((camera, index) => (
                                    <MenuItem value={camera.camera_id} onClick={() => { handleClick(index + 1) }}>Camera {camera.camera_id}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item md={6} lg={4} xs={12}>
                        <Typography variant="h6" style={{ color: 'black' }}>
                            From Date:
                            </Typography>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                format="MM/dd/yyyy"
                                onChange={handleDateChange}
                                value={selectedDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                variant="outlined"
                                placeholder="10/08/2020"
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item md={6} lg={4} xs={12}>
                        <Typography variant="h6" style={{ color: 'black' }}>
                            To Date:
                            </Typography>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                format="MM/dd/yyyy"
                                onChange={handleDateChange}
                                value={selectedDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                variant="outlined"
                                placeholder="10/15/2020"
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                </Grid>
            </Paper>

        </div>
    );
}
