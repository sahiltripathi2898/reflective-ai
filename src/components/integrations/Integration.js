import React from 'react';
import { Container, Paper } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import img from './assets/procore.png';

const Integration = (props) => {
  const { history } = props;
  function imageClick() {
    history.push('/integration/client');
  }

  return (
    <div style={{ marginTop: '100px' }}>
      <Container>
        <Paper elevation={8} style={{ width: '330px', height: '250px' }}>
          <img
            src={img}
            alt="procore"
            width="100%"
            height="100%"
            onClick={imageClick}
            style={{ cursor: 'pointer' }}
          ></img>
        </Paper>
      </Container>
    </div>
  );
};

export default withRouter(Integration);
