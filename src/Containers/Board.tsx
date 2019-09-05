import * as React from 'react';
import SideBar from '../Components/SideBar';
import BoardHeader from '../Components/BoardHeader';
import BoardContent from '../Components/BoardContent';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';

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
      <Hidden xsDown>
        <SideBar />
      </Hidden>
      <div className={classes.root}>
        <BoardHeader />
        <BoardContent />
      </div>
    </div>
  );
};

export default Board;
