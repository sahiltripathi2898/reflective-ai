import React, { useState } from 'react';

import Overview from './overview'
import Dates from './dates'

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: '100px',
    marginLeft: '20px',
  },
}));

export default function ProjectHome() {
  const classes = useStyles();
  const [buttonId, setbuttonId] = useState('1');
  const [btnA, setbtnA] = useState('#4cebeb')
  const [btnB, setbtnB] = useState('#4ccceb')
  const [btnC, setbtnC] = useState('#4ccceb')
  // on click #4cebeb
  // #4ccceb

  function firstBtn() {
    setbuttonId('1')
    setbtnA('#4cebeb')
    setbtnB('#4ccceb')
    setbtnC('#4ccceb')
  }
  function secondBtn() {
    setbuttonId('2')
    setbtnA('#4ccceb')
    setbtnB('#4cebeb')
    setbtnC('#4ccceb')
  }
  function thirdBtn() {
    setbuttonId('3')
    setbtnC('#4cebeb')
    setbtnB('#4ccceb')
    setbtnA('#4ccceb')
  }

  if (buttonId === '1') {
    return (
      <div>
        <Container className={classes.root}>
          <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group" >
            <Button onClick={firstBtn} style={{ backgroundColor: btnA }}>Safety Metrics</Button>
            <Button onClick={secondBtn} style={{ backgroundColor: btnB }}>Incident Visuals</Button>
            <Button onClick={thirdBtn} style={{ backgroundColor: btnC }}>Project Team</Button>
          </ButtonGroup>
        </Container>
        <Dates bID={buttonId} />
      </div>
    )
  }
  else if (buttonId === '2') {
    return (
      <div>
        <Container className={classes.root}>
          <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
            <Button onClick={firstBtn} style={{ backgroundColor: btnA }}>Safety Metrics</Button>
            <Button onClick={secondBtn} style={{ backgroundColor: btnB }}>Incident Visuals</Button>
            <Button onClick={thirdBtn} style={{ backgroundColor: btnC }}>Project Team</Button>
          </ButtonGroup>
        </Container>
        <Dates bID={buttonId} />
      </div>
    )
  }
  else if (buttonId === '3') {
    return (
      <div>
        <Container className={classes.root}>
          <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
            <Button onClick={firstBtn} style={{ backgroundColor: btnA }}>Safety Metrics</Button>
            <Button onClick={secondBtn} style={{ backgroundColor: btnB }}>Incident Visuals</Button>
            <Button onClick={thirdBtn} style={{ backgroundColor: btnC }}>Project Team</Button>
          </ButtonGroup>
        </Container>
        <Overview />
      </div>
    )
  }

}
