import * as React from 'react';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import IssueContentItem from './IssueContentItem';

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

  return (
    <div className={classes.root}>
      <IssueContentItem />
      <IssueContentItem />
      <IssueContentItem />
    </div>
  );
};

export default IssueContent;
