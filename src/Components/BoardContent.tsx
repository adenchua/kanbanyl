import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import blueGrey from '@material-ui/core/colors/blueGrey';
import BoardContentItem from './BoardContentItem';
import firebase from 'firebase';
import { UserStoryType } from '../api/userStoryApi';
import { userStoryStore } from '../index';
import { observer } from 'mobx-react';
import CircularProgress from '@material-ui/core/CircularProgress';

/**
 * Returns the content of a Boardpage, which includes the four main phase containers to store user stories
 */

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    background: blueGrey[50],
    padding: theme.spacing(1),
  },
  gridItem: {
    padding: theme.spacing(2),
  },
  mb: {
    marginBottom: theme.spacing(3),
  },
}));

const BoardContent: React.FC = () => {
  const classes = useStyles();
  const [disableButton, setDisableButton] = React.useState<boolean>(false); //disables button for card creation if user does not have display name
  const [loading, setLoading] = React.useState<boolean>(true); //loading results

  React.useEffect(() => {
    retrieveUserStories(); //on mount, retrieves all user stories

    var user = firebase.auth().currentUser;
    if (user != null && user.displayName === null) {
      setDisableButton(true); //disables card creation button
    }
  }, []);

  //retrieves all user stories and updates the UserStoryStore with the new list
  const retrieveUserStories = () => {
    let list: UserStoryType[] = [];
    var dbRef = firebase.database().ref('stories/');
    dbRef.on('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        childData['key'] = childKey;
        list.push(childData);
      });
      userStoryStore.setUserStoryList(list); //set store with list
      setLoading(false); //stops loading progress
      list = []; //resets list
    });
  };

  return (
    <Grid container direction="row" justify="space-between">
      <Grid item xs={12} md={3} className={classes.gridItem}>
        <Paper className={classes.paper}>
          <Typography className={classes.mb} color="primary" variant="subtitle2">
            {`TO DO ${userStoryStore.getTodoUserStories.length}`}
          </Typography>
          {loading && <CircularProgress />}
          {!loading &&
            userStoryStore.getTodoUserStories.map(userStoryDetails => {
              return <BoardContentItem userStoryDetails={userStoryDetails} key={userStoryDetails.key} />;
            })}
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            component={RouterLink}
            to="/create"
            disabled={disableButton}
          >
            Create User Story
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3} className={classes.gridItem}>
        <Paper className={classes.paper}>
          <Typography className={classes.mb} color="primary" variant="subtitle2">
            {`IN PROGRESS ${userStoryStore.getInProgressUserStories.length}`}
          </Typography>
          {loading && <CircularProgress />}
          {!loading &&
            userStoryStore.getInProgressUserStories.map(userStoryDetails => {
              return <BoardContentItem userStoryDetails={userStoryDetails} key={userStoryDetails.key} />;
            })}
        </Paper>
      </Grid>
      <Grid item xs={12} md={3} className={classes.gridItem}>
        <Paper className={classes.paper}>
          <Typography className={classes.mb} color="primary" variant="subtitle2">
            {`TO REVIEW ${userStoryStore.getToReviewUserStories.length}`}
          </Typography>
          {loading && <CircularProgress />}
          {!loading &&
            userStoryStore.getToReviewUserStories.map(userStoryDetails => {
              return <BoardContentItem userStoryDetails={userStoryDetails} key={userStoryDetails.key} />;
            })}
        </Paper>
      </Grid>
      <Grid item xs={12} md={3} className={classes.gridItem}>
        <Paper className={classes.paper}>
          <Typography className={classes.mb} color="primary" variant="subtitle2">
            {`COMPLETED ${userStoryStore.getCompletedUserStories.length}`}
          </Typography>
          {loading && <CircularProgress />}
          {!loading &&
            userStoryStore.getCompletedUserStories.map(userStoryDetails => {
              return <BoardContentItem userStoryDetails={userStoryDetails} key={userStoryDetails.key} />;
            })}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default observer(BoardContent);
