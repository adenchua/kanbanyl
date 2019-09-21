import * as React from 'react';
import SideBar from '../components/SideBar';
import BoardHeader from '../components/BoardHeader';
import BoardContent from '../components/BoardContent';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import firebase from 'firebase';
import SnackbarContent from '@material-ui/core/SnackbarContent';

/**
 * Returns a page where it displays a kanban style board to users, the sidebar, and the header component
 */

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(2),
  },
  snackbar: {
    backgroundColor: '#d9534f',
  },
}));

const Board: React.FC = (props: any) => {
  const classes = useStyles();
  const [showWarning, setShowWarning] = React.useState<boolean>(false); //state to display if profile name has been set. Else show a warning to prompt profile update

  //on component mount, check if user is logged in, else signs out the user.
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        if (user.displayName === null) {
          setShowWarning(true); //display set profile message
        } else {
          setShowWarning(false);
        }
      } else {
        handleLogout(); //logout user
      }
    });
  });

  //perfoms logout and redirects the user to login page
  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        props.history.push('/');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div style={{ display: 'flex' }}>
      <SideBar />
      <div className={classes.root}>
        <BoardHeader />
        {showWarning && (
          <div className={classes.padding}>
            <SnackbarContent
              message={`Hello! It appears you do not have a display name! Update your profile to create user stories.`}
              className={classes.snackbar}
            />
          </div>
        )}
        <BoardContent />
      </div>
    </div>
  );
};

export default Board;
