import React, { useState } from 'react';
import { Container, Paper } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { Typography } from '@material-ui/core'

import img from './assets/procore.png';

const Integration = (props) => {
  const { history } = props;
  function imageClick() {
    history.push('/integration/client');
  }
  const [visible, setVisible] = useState('hidden')

  return (
    <div style={{ marginTop: '100px' }}>
      <Container>
        <Paper elevation={8} style={{ width: '330px', height: '250px', position: 'relative' }}>
          <img
            src={img}
            alt="procore"
            width="100%"
            height="100%"
            onClick={imageClick}
            style={{ cursor: 'pointer', position: 'absolute' }}
            onMouseEnter={() => setVisible('')}
            onMouseLeave={() => setVisible('hidden')}>
          </img>
          <Typography variant="h5" style={{ position: 'absolute', textAlign: 'center', marginTop: '195px', visibility: visible, marginLeft: '90px', color: 'gray' }}>Coming Soon !</Typography>
        </Paper>
      </Container>
    </div>
  );
};

export default withRouter(Integration);
