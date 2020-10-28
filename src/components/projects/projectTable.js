import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import ProjectData from './ProjectData/ProjectHome'

import Spinner from '../spinner'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 16,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const Projects = (props) => {
  const classes = useStyles();
  const { history } = props;

  const [loading,setLoading] =useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false)
     }, 1000);
 
    return () => clearTimeout(timeout);
   },[]);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const data = {
      jwt_token: localStorage.getItem('jwt_token'),
    };
    axios
      .post(
        ' http://ec2-52-53-227-112.us-west-1.compute.amazonaws.com/projects/me',
        data
      )
      .then((res) => {
        //console.log(res.data)
        setRows(res.data.projects);
      })
      .catch((err) => console.log(err));
  }, []);

  function callProjectDetails(projectID, companyID) {
    localStorage.setItem('projectID', projectID)
    localStorage.setItem('companyID', companyID)
    history.push('/project')
  }

  if(loading)
    return <Spinner/>

  return (
    <Container style={{ marginTop: '70px', padding: '30px' }} maxWidth="md">
      <Typography
        variant="h2"
        style={{
          textAlign: 'center',
          marginBottom: '30px',
          fontWeight: '600',
          letterSpacing: '1px',
        }}
      >
        Projects List
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Project Name</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="left">Address</StyledTableCell>
              <StyledTableCell align="left">State</StyledTableCell>
              <StyledTableCell align="left">City</StyledTableCell>
              <StyledTableCell align="left">Zip</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow
                key={row.project_name}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  callProjectDetails(row.project_id, row.company_id)
                }}
              >
                <StyledTableCell component="th" scope="row">
                  {row.project_name}
                </StyledTableCell>
                <StyledTableCell align="left">{row.status}</StyledTableCell>
                <StyledTableCell align="left">{row.address}</StyledTableCell>
                <StyledTableCell align="left">{row.city}</StyledTableCell>
                <StyledTableCell align="left">{row.state}</StyledTableCell>
                <StyledTableCell align="left">{row.zip}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default withRouter(Projects);
