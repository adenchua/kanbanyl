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
import { UserStory } from '../Api/userStoryApi';
import { userStoryStore } from '../index';
import { observer } from 'mobx-react';

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
  React.useEffect(() => {
    retrieveUserStories(); //on mount, retrieves all user stories with default sprint 1
  }, []);

  //retrieves all user stories based on sprint and updates the UserStoryStore with the new list
  const retrieveUserStories = (sprintNumber: number = 1) => {
    let list: UserStory[] = [];
    var dbRef = firebase.database().ref('stories/');
    dbRef.on('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        childData['key'] = childKey;
        if (childData.sprintNumber === sprintNumber) {
          list.push(childData);
        }
      });
      userStoryStore.setUserStoryList(list); //set store with list
      list = []; //resets list
    });
  };

  return (
    <Grid container direction="row" justify="space-between">
      <Grid item xs={12} sm={3} className={classes.gridItem}>
        <Paper className={classes.paper}>
          <Typography className={classes.mb} color="primary" variant="subtitle2">
            {`TO DO ${userStoryStore.getTodoUserStories.length}`}
          </Typography>
          {userStoryStore.getTodoUserStories.map(userStoryDetails => {
            return <BoardContentItem userStoryDetails={userStoryDetails} key={userStoryDetails.key} />;
          })}
          <Button fullWidth variant="contained" color="secondary" component={RouterLink} to="/create">
            Create User Story
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={3} className={classes.gridItem}>
        <Paper className={classes.paper}>
          <Typography className={classes.mb} color="primary" variant="subtitle2">
            {`IN PROGRESS ${userStoryStore.getInProgressUserStories.length}`}
          </Typography>
          {userStoryStore.getInProgressUserStories.map(userStoryDetails => {
            return <BoardContentItem userStoryDetails={userStoryDetails} key={userStoryDetails.key} />;
          })}
        </Paper>
      </Grid>
      <Grid item xs={12} sm={3} className={classes.gridItem}>
        <Paper className={classes.paper}>
          <Typography className={classes.mb} color="primary" variant="subtitle2">
            {`TO REVIEW ${userStoryStore.getToReviewUserStories.length}`}
          </Typography>
          {userStoryStore.getToReviewUserStories.map(userStoryDetails => {
            return <BoardContentItem userStoryDetails={userStoryDetails} key={userStoryDetails.key} />;
          })}
        </Paper>
      </Grid>
      <Grid item xs={12} sm={3} className={classes.gridItem}>
        <Paper className={classes.paper}>
          <Typography className={classes.mb} color="primary" variant="subtitle2">
            {`COMPLETED ${userStoryStore.getCompletedUserStories.length}`}
          </Typography>
          {userStoryStore.getCompletedUserStories.map(userStoryDetails => {
            return <BoardContentItem userStoryDetails={userStoryDetails} key={userStoryDetails.key} />;
          })}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default observer(BoardContent);
