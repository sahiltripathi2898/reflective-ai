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
import FormHelperText from '@material-ui/core/FormHelperText';


import Overview from './overview'
import Risk from './risk'
import Visual from './visual'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: '20px',
        marginTop: '50px',
    },
    dates: {
        flexGrow: 1
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

export default function MaterialUIPickers(props) {
    const { bID } = props

    // The first commit of Material-UI
    /*  const [selectedDate, setSelectedDate] = React.useState(new Date());
     const [selectedDate, setSelectedDate] = React.useState(new Date()); */

    // Dates
    const [sDate, setsDate] = useState(new Date())
    const [eDate, seteDate] = useState(new Date())

    const [age, setAge] = React.useState('');
    const handleStartDateChange = (date) => {
        setsDate(date);
        //console.log(sDate)
    };
    const handleEndDateChange = (date) => {
        seteDate(date);
        //console.log(eDate)
    };

    const [disableDate, setdisableDate] = useState(false)


    // Drop down
    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    //Camera API call
    const [cameras, setCameras] = useState([]);

    useEffect(() => {
        const data = {
            project_id: localStorage.getItem('projectID'),
            jwt_token: localStorage.getItem('jwt_token'),
        };
        axios
            .post(
                'http://ec2-52-53-227-112.us-west-1.compute.amazonaws.com/project/cameras',
                data
            )
            .then((res) => {
                console.log(res.data)
                setCameras(res.data.cameras);
                setsDate(new Date(res.data.cameras[0].start_date))
                if (res.data.cameras[0].start_date === null)
                    setdisableDate(true)
            })
            .catch((err) => console.log(err));
    }, []);

    const [cameraID, setcameraID] = useState(1);
    const [help, sethelp] = useState(true)

    const [visible, setVisible] = useState(true)

    useEffect(() => {
        if (bID === '3')
            setVisible(false)
        else
            setVisible(true)
    }, [bID])

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={3} >
                {visible === true && <Grid item xs={12}>
                    <Paper className={classes.paper} elevation={5}>
                        <div className={classes.dates}>
                            <Grid container spacing={3} >
                                <Grid item lg={4} md={6} xs={12}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="demo-controlled-open-select-label">Select Camera </InputLabel>
                                        <Select
                                            labelId="demo-controlled-open-select-label"
                                            id="demo-controlled-open-select"
                                            onClose={handleClose}
                                            onOpen={handleOpen}
                                            onChange={handleChange}
                                            value={age}
                                            placeholder="Camera 1"
                                        >
                                            {cameras.map((camera, index) => (
                                                <MenuItem value={camera.camera_id} key={index} onClick={() => {
                                                    sethelp(false)
                                                    setcameraID(index + 1)
                                                    if (camera.start_date !== null) {
                                                        setsDate(new Date(camera.start_date))
                                                        setdisableDate(false)
                                                    }
                                                    else if (camera.start_date === null) {
                                                        setdisableDate(true)
                                                    }
                                                }}>Camera {camera.camera_id}</MenuItem>
                                            ))}
                                        </Select>
                                        {help && <FormHelperText>Default Camera 1</FormHelperText>}
                                    </FormControl>
                                </Grid>
                                <Grid item lg={4} md={6} xs={12}>
                                    <Typography variant="h6" style={{ color: 'black' }}>
                                        From Date:
                            </Typography>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog"
                                            format="MM/dd/yyyy"
                                            onChange={handleStartDateChange}
                                            value={sDate}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                            variant="outlined"
                                            placeholder="10/08/2020"
                                            disabled={disableDate}
                                            maxDate={new Date()}
                                        />
                                    </MuiPickersUtilsProvider>
                                </Grid>
                                <Grid item lg={4} md={6} xs={12}>
                                    <Typography variant="h6" style={{ color: 'black' }}>
                                        To Date:
                            </Typography>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog"
                                            format="MM/dd/yyyy"
                                            onChange={handleEndDateChange}
                                            value={eDate}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                            variant="outlined"
                                            placeholder="10/15/2020"
                                            maxDate={new Date()}
                                            minDate={sDate}
                                            disabled={disableDate}
                                        />
                                    </MuiPickersUtilsProvider>
                                </Grid>
                            </Grid>
                        </div>
                    </Paper>
                </Grid>}
                <Grid item xs={12}>
                    {bID === '1' && <Risk cID={cameraID} sDate={sDate} eDate={eDate} />}
                    {bID === '2' && <Visual cID={cameraID} sDate={sDate} eDate={eDate} />}
                    {bID === '3' && <Overview />}
                </Grid>
            </Grid>
        </div>
    );
}
