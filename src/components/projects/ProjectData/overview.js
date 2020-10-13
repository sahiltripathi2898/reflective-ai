import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Typography , Container ,Divider, Grid} from '@material-ui/core'

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
    minWidth: '100%',
  },
});

export default function Overview() {
  const classes = useStyles();

  function createData1(role, name, email, mobile) {
    return { role, name, email, mobile };
  }
  
  const rows1 = [
    createData1('', 'Sahil Tripathi', 'sahil@gmail.com', 49698302),
    createData1('', 'Aayush', 'aayush@gmail.com', 73496234),
  ];

  function createData2(issue, desc, status, cDate, dDate) {
    return { issue, desc, status, cDate, dDate };
  }
  
  const rows2 = [
    createData2('No open issues', '', '', '', ''),
  ];

  return (
      <Grid container style={{padding:'20px'}} >
      <Grid item xs={12}
        style={{
          fontSize: '2rem',
          marginBottom: '30px',
          marginTop: '20px',
          fontFamily: 'Quicksand , sans-serif',
          fontSize: '36px',
        }}
      >
        Projects Overview
      </Grid>
      <Grid item xs={12}>
      <Typography variant="h6" style={{marginBottom:'10px'}}>
        PROJECT TEAM
      </Typography>
      </Grid>
<Grid item xs={12}>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Role</StyledTableCell>
            <StyledTableCell align="left">Name</StyledTableCell>
            <StyledTableCell align="left">Email ID</StyledTableCell>
            <StyledTableCell align="left">Mobile</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows1.map((row) => (
            <StyledTableRow key={row.role}>
              <StyledTableCell component="th" scope="row">
                {row.role}
              </StyledTableCell>
              <StyledTableCell align="left">{row.name}</StyledTableCell>
              <StyledTableCell align="left">{row.email}</StyledTableCell>
              <StyledTableCell align="left">{row.mobile}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>
    <Grid item xs={12}>
    <Divider style={{marginTop:'30px',marginBottom:'30px'}}/>
    </Grid>
    <Grid item xs={12}>
    <Typography variant="h6" style={{marginBottom:'10px'}}>
        MY OPEN ISSUES
      </Typography>
      </Grid>
      <Grid item xs={12}>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Issue Type</StyledTableCell>
            <StyledTableCell align="left">Description</StyledTableCell>
            <StyledTableCell align="left">Status</StyledTableCell>
            <StyledTableCell align="left">Created Date</StyledTableCell>
            <StyledTableCell align="left">Due Date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows2.map((row) => (
            <StyledTableRow key={row.issue}>
              <StyledTableCell component="th" scope="row">
                {row.issue}
              </StyledTableCell>
              <StyledTableCell align="left">{row.desc}</StyledTableCell>
              <StyledTableCell align="left">{row.status}</StyledTableCell>
              <StyledTableCell align="left">{row.cDate}</StyledTableCell>
              <StyledTableCell align="left">{row.dDate}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>
    <Grid item xs={12}>
    <Divider style={{marginTop:'30px',marginBottom:'30px'}}/>
    </Grid>
    </Grid>
  );
}
