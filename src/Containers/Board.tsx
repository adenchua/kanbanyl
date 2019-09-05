import * as React from 'react';
import SideBar from '../Components/SideBar';
import BoardHeader from '../Components/BoardHeader';
import BoardContent from '../Components/BoardContent';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import firebase from 'firebase';
/**
 * Returns a page where it displays a kanban style board to users
 */

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(3),
    flexGrow: 1,
  },
}));

const Board: React.FC = (props: any) => {
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in. Do nothing
      } else {
        handleLogout(); //logsout user
      }
    });
  });

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        props.history.push('/');
        window.localStorage.clear(); //clear local storage
      })
      .catch(error => {
        console.log(error);
      });
  };
  const classes = useStyles();
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
