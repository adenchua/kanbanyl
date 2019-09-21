import * as React from 'react';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import IssueContentItem from './IssueContentItem';
import firebase from 'firebase';
import { issueStore } from '../index';
import { IssueType } from '../api/issueApi';
import { observer } from 'mobx-react';
import CircularProgress from '@material-ui/core/CircularProgress';

/**
 * Displays a user board with a list of issue content items to the users
 */

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(5),
  },
}));

const IssueContent = () => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState<boolean>(true); //loading results

  React.useEffect(() => {
    retrieveIssues(); //on mount, retrieves all issues
  }, []);

  //retrieves all issues and updates the IssueStore with the new list
  const retrieveIssues = () => {
    let list: IssueType[] = [];
    var dbRef = firebase.database().ref('issues/');
    dbRef.on('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        childData['key'] = childKey;
        list.push(childData);
      });
      issueStore.setListOfIssues(list); //set store with list
      setLoading(false); //stops loading progress
      list = []; //resets list
    });
  };

  return (
    <div className={classes.root}>
      {loading && <CircularProgress />}
      {!loading &&
        issueStore.listOfIssues.map(issue => {
          if (issueStore.issueFilter === 'unresolved' && issue.status === 'unresolved') {
            return <IssueContentItem key={issue.key} issueDetails={issue} />;
          }
          if (issueStore.issueFilter === 'urgent' && issue.status === 'urgent') {
            return <IssueContentItem key={issue.key} issueDetails={issue} />;
          }
          if (issueStore.issueFilter === '') {
            return <IssueContentItem key={issue.key} issueDetails={issue} />;
          }
          return null; //should not reach here
        })}
    </div>
  );
};

export default observer(IssueContent);
