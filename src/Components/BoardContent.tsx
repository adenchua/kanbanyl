import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import BoardContentItem from '../Components/BoardContentItem';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import blueGrey from '@material-ui/core/colors/blueGrey';

const useStyles = makeStyles((theme: Theme) => ({
  container: {},
  paper: {
    background: blueGrey[50],
    minHeight: '800px',
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

  return (
    <Grid container direction="row" className={classes.container} justify="space-between">
      <Grid item xs={3} className={classes.gridItem}>
        <Paper className={classes.paper}>
          <Typography className={classes.mb} color="primary" variant="subtitle2">
            TO DO 2
          </Typography>
          <BoardContentItem />
          <BoardContentItem />
          <Button fullWidth variant="contained" color="secondary">
            Create User Story
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={3} className={classes.gridItem}>
        <Paper className={classes.paper}>
          <Typography className={classes.mb} color="primary" variant="subtitle2">
            IN PROGRESS 1
          </Typography>
          <BoardContentItem />
        </Paper>
      </Grid>
      <Grid item xs={3} className={classes.gridItem}>
        <Paper className={classes.paper}>
          <Typography className={classes.mb} color="primary" variant="subtitle2">
            TO REVIEW 1
          </Typography>
          <BoardContentItem />
        </Paper>
      </Grid>
      <Grid item xs={3} className={classes.gridItem}>
        <Paper className={classes.paper}>
          <Typography className={classes.mb} color="primary" variant="subtitle2">
            COMPLETED 1
          </Typography>
          <BoardContentItem />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default BoardContent;
