import * as React from 'react';
import SideBar from '../components/SideBar';
import Container from '@material-ui/core/Container';
import CardCreationContent from '../components/CardCreationContent';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';

/**
 * Returns a page where it displays a card creation form and a sidebar
 */

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(3),
    flexGrow: 1,
  },
}));

const CardCreationPage: React.FC = () => {
  const classes = useStyles();
  return (
    <div style={{ display: 'flex' }}>
      <SideBar />
      <Container className={classes.root} maxWidth="md">
        <CardCreationContent />
      </Container>
    </div>
  );
};

export default CardCreationPage;
