import React, {useState} from 'react';

import Overview from './overview'
import Risk from './risk';
import Visual from './visual';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import {Container} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop:'100px',
    marginLeft:'20px',    
  },
}));

export default function ProjectHome() {
  const classes = useStyles();
const [buttonId,setbuttonId] = useState('1');

      if(buttonId==='1')
      {
        return (
          <div>
          <Container className={classes.root}>
              <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group" >
                <Button onClick={()=> setbuttonId('1')} style={{}}>Project Overview</Button>
                <Button  onClick={()=> setbuttonId('2')}>Risk Factors</Button>
                <Button onClick={()=> setbuttonId('3')}>Incident Visuals</Button>
              </ButtonGroup>
          </Container>
          <Overview/>
          </div>
        )
      }
      else if(buttonId==='2')
      {
        return (
          <div>
          <Container className={classes.root}>
              <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                <Button onClick={()=> setbuttonId('1')}>Project Overview</Button>
                <Button  onClick={()=> setbuttonId('2')}>Risk Factors</Button>
                <Button onClick={()=> setbuttonId('3')}>Incident Visuals</Button>
              </ButtonGroup>
          </Container>
            <Risk/>
          </div>
        )
      }
      else if(buttonId==='3')
      {
        return (
          <div>
          <Container className={classes.root}>
              <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                <Button onClick={()=> setbuttonId('1')}>Project Overview</Button>
                <Button  onClick={()=> setbuttonId('2')}>Risk Factors</Button>
                <Button onClick={()=> setbuttonId('3')}>Incident Visuals</Button>
              </ButtonGroup>
          </Container>
          <Visual/>
          </div>
        )
      }

}
