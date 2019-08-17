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
import ExitIcon from '@material-ui/icons/ExitToAppRounded';
import Avatar from '@material-ui/core/Avatar';

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

const SideBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Drawer variant="permanent" anchor="left" className={classes.drawer} classes={{ paper: classes.drawerPaper }}>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <WidgetsIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="kanbanyl" secondary="beta release" />
          </ListItem>
          <Divider />
        </List>
        <List subheader={<ListSubheader>View</ListSubheader>}>
          <ListItem button>
            <ListItemIcon>
              <DashBoardIcon />
            </ListItemIcon>
            <ListItemText>Agile Board</ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <BugIcon />
            </ListItemIcon>
            <ListItemText>Issues</ListItemText>
          </ListItem>
          <Divider />
        </List>
        <List subheader={<ListSubheader>Account</ListSubheader>}>
          <ListItem button>
            <ListItemIcon>
              <ExitIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default SideBar;
