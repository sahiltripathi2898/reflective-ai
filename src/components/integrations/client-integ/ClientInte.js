import React, { Component } from 'react';
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
} from '@material-ui/core';

export default class ClientInte extends Component {
  render() {
    return (
      <div style={{ marginTop: '100px' }}>
        <Container>
          <Paper style={{ padding: '20px', borderRadius: '10px' }}>
            <Typography
              variant="h4"
              style={{ color: 'black', textAlign: 'center', padding: '10px' }}
            >
              Integration
            </Typography>
            <form>
              <div style={{ padding: '10px' }}>
                <TextField
                  id="outlined-basic"
                  label="Client ID"
                  variant="outlined"
                />
              </div>
              <div style={{ padding: '10px' }}>
                <TextField
                  id="outlined-basic"
                  label="Client Secret"
                  variant="outlined"
                />
              </div>
              <div style={{ padding: '10px' }}>
                <Button variant="contained" color="primary">
                  Submit
                </Button>
              </div>
            </form>
          </Paper>
        </Container>
      </div>
    );
  }
}
