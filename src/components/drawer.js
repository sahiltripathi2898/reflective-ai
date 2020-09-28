import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// Iconss
import HomeIcon from '@material-ui/icons/Home';
import FolderSharpIcon from '@material-ui/icons/FolderSharp';
import SmsFailedSharpIcon from '@material-ui/icons/SmsFailedSharp'; // Alert
import NotificationsActiveSharpIcon from '@material-ui/icons/NotificationsActiveSharp'; // Risk Factors
import TrendingUpSharpIcon from '@material-ui/icons/TrendingUpSharp'; // Status
import PhotoAlbumSharpIcon from '@material-ui/icons/PhotoAlbumSharp'; // Incident

// File imports
import Dasheader from './home';
import Cards from './card';
import Charthor from './charthoriz';
import Chartvert from './chartvert';
import Workerlist from './list';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: 'whitesmoke',
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
    backgroundColor: '#0f2c52',
    color: 'white',
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
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
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

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Welcome to Reflective AI
          </Typography>
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
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button style={{ marginBottom: '10px', marginTop: '5px' }}>
            <ListItemIcon>
              {<HomeIcon style={{ color: '#0f2c52', fontSize: '28px' }} />}
            </ListItemIcon>
            <ListItemText primary={'Home'} />
          </ListItem>
          <ListItem button style={{ marginBottom: '10px' }}>
            <ListItemIcon>
              {
                <FolderSharpIcon
                  style={{ color: '#0f2c52', fontSize: '28px' }}
                />
              }
            </ListItemIcon>
            <ListItemText primary={'Projects'} />
          </ListItem>
          <ListItem button style={{ marginBottom: '10px' }}>
            <ListItemIcon>
              {
                <SmsFailedSharpIcon
                  style={{ color: '#0f2c52', fontSize: '28px' }}
                />
              }
            </ListItemIcon>
            <ListItemText primary={'Risk Factors'} />
          </ListItem>
          <ListItem button style={{ marginBottom: '10px' }}>
            <ListItemIcon>
              {
                <NotificationsActiveSharpIcon
                  style={{ color: '#0f2c52', fontSize: '28px' }}
                />
              }
            </ListItemIcon>
            <ListItemText primary={'Alert'} />
          </ListItem>
          <ListItem button style={{ marginBottom: '10px' }}>
            <ListItemIcon>
              {
                <TrendingUpSharpIcon
                  style={{ color: '#0f2c52', fontSize: '28px' }}
                />
              }
            </ListItemIcon>
            <ListItemText primary={'Status and Trends'} />
          </ListItem>
          <ListItem button style={{ marginBottom: '10px' }}>
            <ListItemIcon>
              {
                <PhotoAlbumSharpIcon
                  style={{ color: '#0f2c52', fontSize: '28px' }}
                />
              }
            </ListItemIcon>
            <ListItemText primary={'Incident and Visuals'} />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {/* Rest of the components*/}
        <Dasheader />
        <Cards />
        <Charthor />
        <Chartvert />
        <Workerlist />
      </main>
    </div>
  );
}
