import * as React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashBoardIcon from '@material-ui/icons/DashboardRounded';
import BugIcon from '@material-ui/icons/BugReportRounded';
import makeStyles from '@material-ui/styles/makeStyles';
import ListSubheader from '@material-ui/core/ListSubheader';
import WidgetsIcon from '@material-ui/icons/WidgetsRounded';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import AccountBoxIcon from '@material-ui/icons/AccountBoxRounded';
import ExitIcon from '@material-ui/icons/ExitToAppRounded';
import Avatar from '@material-ui/core/Avatar';
import firebase from 'firebase';
import Hidden from '@material-ui/core/Hidden';
import { Link as RouterLink, withRouter } from 'react-router-dom';

/**
 * Returns a sidebar component which stores navigation details, logout button for users
 */

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  avatar: {
    color: 'white',
    backgroundColor: 'orange',
  },
}));

const SideBar = (props: any) => {
  const classes = useStyles();

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(
        function() {
          //sign-out successful
          props.history.push('/');
        },
        function(error) {
          //an error occured
          alert('Sorry, something went wrong, please try again');
        }
      );
  };

  return (
    <Hidden xsDown>
      <div className={classes.root}>
        <Drawer variant="permanent" anchor="left" className={classes.drawer} classes={{ paper: classes.drawerPaper }}>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <WidgetsIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="kanbanyl" secondary="v.0.2" />
            </ListItem>
            <Divider />
          </List>
          <List subheader={<ListSubheader>Navigation</ListSubheader>}>
            <ListItem button component={RouterLink} to="/board">
              <ListItemIcon>
                <DashBoardIcon />
              </ListItemIcon>
              <ListItemText>Agile Board</ListItemText>
            </ListItem>
            <ListItem button component={RouterLink} to="/issues">
              <ListItemIcon>
                <BugIcon />
              </ListItemIcon>
              <ListItemText>Issues</ListItemText>
            </ListItem>
            <Divider />
          </List>
          <List subheader={<ListSubheader>Account</ListSubheader>}>
            <ListItem button component={RouterLink} to="/profile">
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <ExitIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Drawer>
      </div>
    </Hidden>
  );
};

export default withRouter(SideBar);
