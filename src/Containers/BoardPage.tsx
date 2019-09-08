import * as React from 'react';
import SideBar from '../components/SideBar';
import BoardHeader from '../components/BoardHeader';
import BoardContent from '../components/BoardContent';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import firebase from 'firebase';

/**
 * Returns a page where it displays a kanban style board to users, the sidebar, and the header component
 */

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(3),
    flexGrow: 1,
  },
}));

const Board: React.FC = (props: any) => {
  const classes = useStyles();
  //on component mount, check if user is logged in, else signs out the user.
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in. Do nothing
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
        <BoardContent />
      </div>
    </div>
  );
};

export default Board;
