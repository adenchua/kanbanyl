import * as React from 'react';
import SideBar from '../Components/SideBar';
import Container from '@material-ui/core/Container';
import BoardHeader from '../Components/BoardHeader';
import BoardContent from '../Components/BoardContent';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';

/**
 * Returns a page where it displays a kanban style board to users
 */

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(3),
    flexGrow: 1,
  },
}));

const Board: React.FC = () => {
  const classes = useStyles();
  return (
    <div style={{ display: 'flex' }}>
      <SideBar />
      <Container className={classes.root} maxWidth="xl">
        <BoardHeader />
        <BoardContent />
      </Container>
    </div>
  );
};

export default Board;
