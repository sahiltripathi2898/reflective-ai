import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Divider,
  IconButton,
  Menu,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Avatar,
  MenuItem,
  useMediaQuery,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { withStyles } from '@material-ui/core/styles';

// Icons
import HomeIcon from '@material-ui/icons/Home';
import PhotoAlbumSharpIcon from '@material-ui/icons/PhotoAlbumSharp'; // Incident
import { MdSettings } from 'react-icons/md';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: 'whitesmoke',
  },
  listItemText: {
    fontSize: '18px', //Insert your required size
    fontFamily: 'Hind , sans-serif',
    fontWeight: '600',
    letterSpacing: '1px',
  },
  item: {
    padding: '28px',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: 'white',
    color: 'black',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: '36px',
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    backgroundColor: 'blue',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: '	#031b33',
    color: 'white',
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
    backgroundColor: '	#031b33',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

// Account setting dropdown
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

//////////////////////////
// Main Drawer Component
//////////////////////////

const MiniDrawer = (props) => {
  //Routing
  const { history } = props;

  //Using Styles
  const classes = useStyles();
  const theme = useTheme();

  //Drawer open-closing
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Media Query

  const matches = useMediaQuery('(min-width:600px)');

  //const buttonFont = matches ? '12px' : '8px';
  //const buttonMarginRight = matches ? '20px' : '10px';
  const toggleMargin = matches ? '36px' : '2px';
  //const nameFont = matches ? '24px' : '18px';
  //const accountFont = matches ? '10px' : '8px';
  const nameMarginRight = matches ? '60px' : '48px';
  const nameVisible = matches ? '' : '';

  //Account Setting drop down
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //To get user details

  const [firstName, setFirst] = useState('Sahil');
  const [lastName, setLast] = useState('Tripahi');
  useEffect(() => {
    // const jwt_token = localStorage.getItem('jwt_token');
    const data = {
      jwt_token: localStorage.getItem('jwt_token'),
    };
    axios
      .post(
        'http://ec2-13-56-161-17.us-west-1.compute.amazonaws.com:7789/user/me',
        data
      )
      .then((res) => {
        //console.log(res.data);
        if (res.data.first_name !== null)
          setFirst(res.data.first_name);
        if (res.data.last_name !== null)
          setLast(res.data.last_name);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
            style={{ marginRight: toggleMargin }}
          >
            <MenuIcon />
          </IconButton>

          {/*<Badge
            badgeContent={4}
            color="secondary"
            style={{ marginRight: buttonMarginRight }}
          >
            <Button
              variant="contained"
              style={{
                fontSize: buttonFont,
                fontWeight: '600',
              }}
              color="primary"
            >
              Past Due
            </Button>
          </Badge>
          <Badge
            badgeContent={2}
            color="secondary"
            style={{ marginRight: buttonMarginRight }}
          >
            <Button
              variant="contained"
              style={{
                fontSize: buttonFont,
                fontWeight: '600',
              }}
              color="primary"
            >
              Open Issues
            </Button>{' '}
            </Badge>*/}
          <div
            style={{
              right: '0',
              position: 'absolute',
              marginRight: nameMarginRight,
              visibility: nameVisible,
            }}
          >
            {/*<div
              style={{
                fontSize: nameFont,
                fontWeight: '500',
                fontFamily: 'serif',
                letterSpacing: '1px',
              }}
            >
              Sahil Tripathi
            </div>*/}
            <div>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                style={{
                  color: 'black',
                  padding: '2px',
                  fontSize: '16px',
                  textTransform: 'none',
                  fontFamily: 'Quicksand , sans-serif',
                }}
              >
                Account Settings{' '}
                <MdSettings
                  style={{
                    fontSize: '20px',
                    marginLeft: '6px',
                    visibility: '',
                  }}
                />
              </Button>
              <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <StyledMenuItem>
                  <ListItemIcon>
                    <AccountCircleIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Hello {firstName}</ListItemText>
                </StyledMenuItem>
                <StyledMenuItem
                  onClick={() => history.push('/profile-setting')}
                >
                  <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="My Profile Settings" />
                </StyledMenuItem>
                <Divider />
                <StyledMenuItem
                  onClick={() => {
                    localStorage.clear();
                    history.push('/login');
                  }}
                >
                  <ListItemIcon>
                    <ExitToAppIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </StyledMenuItem>
              </StyledMenu>
            </div>
          </div>
          <Avatar
            style={{
              right: '0',
              position: 'absolute',
              marginRight: '10px',
              backgroundColor: '#ff9100',
            }}
          >
            {firstName.charAt(0) + lastName.charAt(0)}
          </Avatar>
        </Toolbar>
      </AppBar>
      <Drawer
        open="true"
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <div
            style={{
              fontSize: '26px',
              fontWeight: '600',
              letterSpacing: '1px',
              fontFamily: 'serif',
              color: 'white',
            }}
          >
            Reflective AI
          </div>
          <ArrowBackIosIcon
            color="white"
            onClick={handleDrawerClose}
            style={{ fontSize: '22px', cursor: 'pointer', marginLeft: '14px' }}
          >
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
                <ChevronLeftIcon />
              )}
          </ArrowBackIosIcon>
        </div>
        <Divider />
        <List>
          <ListItem
            button
            onClick={() => history.push('/')}
            style={{ marginBottom: '10px', marginTop: '5px' }}
          >
            <ListItemIcon>
              {<HomeIcon style={{ color: 'white', fontSize: '28px' }} />}
            </ListItemIcon>
            <ListItemText
              primary={'Home'}
              classes={{ primary: classes.listItemText }}
            />
          </ListItem>
          {/*<ListItem
            button
            style={{ marginBottom: '10px' }}
            onClick={() => history.push('/dashboard')}
          >
            <ListItemIcon>
              {<FolderSharpIcon style={{ color: 'white', fontSize: '28px' }} />}
            </ListItemIcon>
            <ListItemText
              primary={'Projects'}
              classes={{ primary: classes.listItemText }}
            />
          </ListItem>
          <ListItem button style={{ marginBottom: '10px' }}>
            <ListItemIcon>
              {
                <SmsFailedSharpIcon
                  style={{ color: 'white', fontSize: '28px' }}
                />
              }
            </ListItemIcon>
            <ListItemText
              primary={'Risk Factors'}
              classes={{ primary: classes.listItemText }}
            />
          </ListItem>
          <ListItem
            button
            onClick={() => history.push('/alert')}
            style={{ marginBottom: '10px' }}
          >
            <ListItemIcon>
              {
                <NotificationsActiveSharpIcon
                  style={{ color: 'white', fontSize: '28px' }}
                />
              }
            </ListItemIcon>
            <ListItemText
              primary={'Alert'}
              classes={{ primary: classes.listItemText }}
            />
          </ListItem>
          <ListItem button style={{ marginBottom: '10px' }}>
            <ListItemIcon>
              {
                <TrendingUpSharpIcon
                  style={{ color: 'white', fontSize: '28px' }}
                />
              }
            </ListItemIcon>
            <ListItemText
              primary={'Status and Trends'}
              classes={{ primary: classes.listItemText }}
            />
          </ListItem>
          <ListItem
            button
            onClick={() => history.push('/dashboard')}
            style={{ marginBottom: '10px' }}
          >
            <ListItemIcon>
              {
                <PhotoAlbumSharpIcon
                  style={{ color: 'white', fontSize: '28px' }}
                />
              }
            </ListItemIcon>
            <ListItemText
              primary={'Incident and Visuals'}
              classes={{ primary: classes.listItemText }}
            />
            </ListItem>*/}
          <ListItem
            button
            onClick={() => history.push('/integration')}
            style={{ marginBottom: '10px' }}
          >
            <ListItemIcon>
              {
                <PhotoAlbumSharpIcon
                  style={{ color: 'white', fontSize: '28px' }}
                />
              }
            </ListItemIcon>
            <ListItemText
              primary={'Integrations'}
              classes={{ primary: classes.listItemText }}
            />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
    </div>
  );
};

export default withRouter(MiniDrawer);
