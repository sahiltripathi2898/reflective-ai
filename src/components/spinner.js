import React, { Fragment } from 'react';
import spinner from './assets/spinner.gif';

export default () => (
  <Fragment>
    <img
      src={spinner}
      style={{ width: '70px', margin: 'auto', display: 'block',marginTop:'100px' }}
      alt='Loading...'
    />
  </Fragment>
);
