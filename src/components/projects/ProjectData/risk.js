import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { FaArrowUp } from 'react-icons/fa';
import video1 from './assets/video.mp4';


//Resposive text
import Typography from '@material-ui/core/Typography';

//images
import ppe from './assets/ppe.png';
import crowd from './assets/crowd.jpeg';
import mw from './assets/mw.jpeg';
import sd from './assets/sd.jpeg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '20px',
  },
  paper: {
    color: 'black',
    height: '220px',
    borderRadius: '10px',
    padding: '30px 20px 30px 20px',
  },
}));

export default function Risk() {
  const classes = useStyles();

  const matches = useMediaQuery('(min-width:700px)');
  const floatPic = matches ? 'right' : 'right';
  const paperHeight = matches ? '220px' : '250px';

  // Camera 
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
        setCameras(res.data.cameras);
      })
      .catch((err) => console.log(err));
  }, []);

  // Camera ID
  const initialcameraID = () => Number(localStorage.getItem('cameraID'))
  const [cameraID, setcameraID] = useState(initialcameraID);

  useEffect(() => {
    function checkUsetData() {
      const item = localStorage.getItem('cameraID')

      if (item) {
        setcameraID(item)
      }
    }

    window.addEventListener('storage', checkUsetData)

    return () => {
      window.removeEventListener('storage', checkUsetData)
    }
  }, [])



  return (
    <div className={classes.root}>
      <div
        style={{
          marginBottom: '20px',
          marginTop: '20px',
          fontFamily: 'Quicksand , sans-serif',
          fontSize: '36px',
        }}
      >
        Safety Metrics
      </div>
      <Grid container spacing={3}>
        <Grid item lg={6} xs={12} md={6}>
          <Paper className={classes.paper} style={{ height: paperHeight }} elevation={5}>
            <div
              style={{
                float: 'left',
                fontSize: '24px',
                fontWeight: '500',
                width: '70%',
              }}
            >
              <Typography
                variant="h5"
                style={{ fontFamily: 'Roboto , sans-serif' }}
              >
                {' '}
                PPE Compliance - Face Mask
              </Typography>
              <Typography
                variant="h4"
                style={{
                  color: '#33f266',
                  margin: '3px 0px 3px 0px',
                  fontWeight: '600',
                }}
              >
                None
              </Typography>
              <div
                style={{
                  color: '#33f266s',
                  margin: '3px 0px 3px 0px',
                  fontSize: '30px',
                  fontWeight: '600',
                }}
              ></div>
            </div>
            <div style={{ float: floatPic, width: '30%', right: '0' }}>
              <img
                alt="risk-images"
                src={ppe}
                width="70px"
                height="70px"
                style={{ float: floatPic }}
              />
            </div>
          </Paper>
        </Grid>
        <Grid item lg={6} xs={12} md={6}>
          <Paper className={classes.paper} style={{ height: paperHeight }} elevation={5}>
            <div
              style={{
                float: 'left',
                fontSize: '24px',
                fontWeight: '500',
                width: '70%',
              }}
            >
              <Typography
                variant="h5"
                style={{ fontFamily: 'Roboto , sans-serif' }}
              >
                Physical Distancing Violations
              </Typography>

              <div
                style={{
                  color: 'orange',
                  margin: '3px 0px 3px 0px',
                  fontSize: '30px',
                  fontWeight: '600',
                }}
              >
                17
              </div>
              <div
                style={{
                  color: 'orange',
                  margin: '3px 0px 3px 0px',
                  fontSize: '30px',
                  fontWeight: '600',
                }}
              >
                16.66 % <FaArrowUp />
              </div>
            </div>
            <div style={{ float: floatPic, width: '30%' }}>
              <img
                alt="risk-images"
                src={sd}
                width="70px"
                height="70px"
                style={{ float: floatPic }}
              />
            </div>
          </Paper>
        </Grid>
        <Grid item lg={6} xs={12} md={6}>
          <Paper className={classes.paper} style={{ height: paperHeight }} elevation={5}>
            <div
              style={{
                float: 'left',
                fontSize: '24px',
                fontWeight: '500',
                width: '70%',
              }}
            >
              <Typography
                variant="h5"
                style={{ fontFamily: 'Roboto , sans-serif' }}
              >
                PPE Compliance - Hard Hat
              </Typography>

              <div
                style={{
                  color: 'orange',
                  margin: '3px 0px 3px 0px',
                  fontSize: '30px',
                  fontWeight: '600',
                }}
              >
                17
              </div>
              <div
                style={{
                  color: 'orange',
                  margin: '3px 0px 3px 0px',
                  fontSize: '30px',
                  fontWeight: '600',
                }}
              >
                16.66 % <FaArrowUp />
              </div>
            </div>
            <div style={{ float: floatPic, width: '30%' }}>
              <img
                alt="risk-images"
                src={sd}
                width="70px"
                height="70px"
                style={{ float: floatPic }}
              />
            </div>
          </Paper>
        </Grid>
        <Grid item lg={6} xs={12} md={6}>
          <Paper className={classes.paper} style={{ height: paperHeight }} elevation={5}>
            <div
              style={{
                float: 'left',
                fontSize: '24px',
                fontWeight: '500',
                width: '70%',
              }}
            >
              <Typography
                variant="h5"
                style={{ fontFamily: 'Roboto , sans-serif' }}
              >
                PPE Compliance - High Viz Vest
              </Typography>

              <div
                style={{
                  color: 'orange',
                  margin: '3px 0px 3px 0px',
                  fontSize: '30px',
                  fontWeight: '600',
                }}
              >
                17
              </div>
              <div
                style={{
                  color: 'orange',
                  margin: '3px 0px 3px 0px',
                  fontSize: '30px',
                  fontWeight: '600',
                }}
              >
                16.66 % <FaArrowUp />
              </div>
            </div>
            <div style={{ float: floatPic, width: '30%' }}>
              <img
                alt="risk-images"
                src={sd}
                width="70px"
                height="70px"
                style={{ float: floatPic }}
              />
            </div>
          </Paper>
        </Grid>
        <Grid item lg={6} xs={12} md={6}>
          <Paper className={classes.paper} style={{ height: paperHeight }} elevation={5}>
            <div
              style={{
                float: 'left',
                fontSize: '24px',
                fontWeight: '500',
                width: '70%',
              }}
            >
              <Typography
                variant="h5"
                style={{ fontFamily: 'Roboto , sans-serif' }}
              >
                Crowding Violations
              </Typography>

              <div
                style={{
                  color: '#33f266',
                  margin: '3px 0px 3px 0px',
                  fontSize: '30px',
                  fontWeight: '600',
                }}
              >
                0
              </div>
              <div
                style={{
                  color: '#33f266',
                  margin: '3px 0px 3px 0px',
                  fontSize: '30px',
                  fontWeight: '600',
                }}
              >
                0 % <FaArrowUp />
              </div>
            </div>
            <div style={{ float: floatPic, width: '30%' }}>
              <img
                alt="risk-images"
                src={crowd}
                width="70px"
                height="70px"
                style={{ float: floatPic }}
              />
            </div>
          </Paper>
        </Grid>
        <Grid item lg={6} xs={12} md={6}>
          <Paper className={classes.paper} style={{ height: paperHeight }} elevation={5}>
            <div
              style={{
                float: 'left',
                fontSize: '24px',
                fontWeight: '500',
                width: '70%',
              }}
            >
              <Typography
                variant="h5"
                style={{ fontFamily: 'Roboto , sans-serif' }}
              >
                Occupancy Maximum
              </Typography>
              <div
                style={{
                  color: '#33f266',
                  margin: '3px 0px 3px 0px',
                  fontSize: '30px',
                  fontWeight: '600',
                }}
              >
                15
              </div>
              <div
                style={{
                  color: '#33f266',
                  margin: '3px 0px 3px 0px',
                  fontSize: '30px',
                  fontWeight: '600',
                }}
              >
                15.38 % <FaArrowUp />
              </div>
            </div>
            <div style={{ float: floatPic, width: '30%' }}>
              <img
                alt="risk-images"
                src={mw}
                width="70px"
                height="70px"
                style={{ float: floatPic }}
              />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <div
            style={{
              marginTop: '50px',
              fontFamily: 'Quicksand , sans-serif',
              fontSize: '36px',
            }}
          >
            Hotspot Analysis
      </div>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper} style={{ height: '730px', marginBottom: '50px' }}>
            <iframe
              width="100%"
              height="680px"
              src={video1}
              frameborder="0"
              controls
              allowfullscreen
              title="video"
              style={{
                borderRadius: '5px',
                display: 'inline-block',
                margin: '0 auto',
              }}
            ></iframe>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
