import * as React from 'react';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import { issueStore } from '../index';
import { Link as RouterLink } from 'react-router-dom';

/**
 * Displays a user board with issue cards to the users, and buttons to create and filter issues
 */

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(3),
  },
  buttonGroup: {
    flexGrow: 1,
  },
}));

const IssueHeader = () => {
  const classes = useStyles();

  //updates the issue store's issueFilter
  const handleApplyFilter = (filter: string) => {
    issueStore.setIssueFilter(filter);
  };

  return (
    <Grid container className={classes.root}>
      <Grid item className={classes.buttonGroup}>
        <ButtonGroup color="default" variant="contained">
          <Button onClick={() => handleApplyFilter('')}>All Issues</Button>
          <Button onClick={() => handleApplyFilter('unresolved')}>Unresolved Issues</Button>
          <Button onClick={() => handleApplyFilter('urgent')}>Urgent Issues</Button>
        </ButtonGroup>
      </Grid>
      <Hidden xsDown>
        <Grid item>
          <Button variant="contained" color="primary" component={RouterLink} to="/new-issue">
            New Issue
          </Button>
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default IssueHeader;
