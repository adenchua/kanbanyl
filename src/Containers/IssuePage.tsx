import * as React from 'react';
import SideBar from '../components/SideBar';
import IssueContent from '../components/IssueContent';
import IssueHeader from '../components/IssueHeader';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';

/**
 * Returns a sidebar and issue page contents.
 */

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
  },
}));

const IssuePage = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <SideBar />
      <Container maxWidth="xl">
        <IssueHeader />
        <IssueContent />
      </Container>
    </div>
  );
};

export default IssuePage;
