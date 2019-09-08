import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Hidden from '@material-ui/core/Hidden';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { resetUserStories } from '../api/userStoryApi';
import firebase from 'firebase';
import { userStoryStore } from '../index';
import { observer } from 'mobx-react';

/**
 * Board header used in the board page, which consists of a search bar, filter buttons
 */

const useStyles = makeStyles((theme: Theme) => ({
  sprintButton: {
    marginLeft: theme.spacing(2),
  },
  grid: {
    margin: theme.spacing(1, 2),
  },
  searchBar: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
  ml: {
    marginLeft: theme.spacing(1),
  },
  searchContainer: {
    flexGrow: 1,
    margin: theme.spacing(1, 2),
  },
  rightContainer: {
    height: '100%',
  },
}));

const BoardHeader: React.FC = () => {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false); //modal for new sprint
  const [newSprintInput, setNewSprintInput] = React.useState<string>(''); //user input to match 'NEWSPRINT', this affects the 'confirm' button
  const [searchInput, setSearchInput] = React.useState<string>(''); //user input for search

  React.useEffect(() => {
    retrieveSprintDuration(); //on mount, retrieves sprint duration
  }, []);

  // handles open modal to reset sprint
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  //handles close modal menu
  const handleModalClose = () => {
    setModalOpen(false);
  };

  // closes the modal and resets user stories
  const handleNewSprint = () => {
    handleModalClose(); //closes modal
    resetUserStories();
  };

  //retrieves sprint duration from the database and updates the store
  const retrieveSprintDuration = () => {
    var dbRef = firebase.database().ref('sprint/sprintDate');
    dbRef.on('value', function(snapshot) {
      userStoryStore.setSprintDuration(snapshot.val()); //sets sprint duration to store
    });
  };

  //updates the user input for search in the user story store and applies user story filtering based on keywords
  const handleSearchClick = () => {
    userStoryStore.setUserStoryContentFilter(searchInput); //updates store with search input and apply filtering
  };

  return (
    <Grid container>
      <Grid item className={classes.searchContainer}>
        <Grid container alignItems="center">
          <Grid item>
            <Paper className={classes.searchBar}>
              <InputBase
                className={classes.input}
                placeholder="Search Keywords"
                onChange={e => setSearchInput(e.target.value)}
              />
              <Divider className={classes.divider} />
              <IconButton
                className={classes.iconButton}
                aria-label="search"
                color="primary"
                onClick={handleSearchClick}
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
          <Grid item>
            <Button variant="text" color="primary" className={classes.ml} disabled>
              Filter
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.grid}>
        <Grid container alignItems="center" className={classes.rightContainer}>
          <Grid item>
            <Typography variant="caption" color="textSecondary">
              {`${userStoryStore.getRemainingSprintDuration} Day(s) Remaining`}
            </Typography>
          </Grid>
          <Hidden xsDown>
            <Grid item className={classes.ml}>
              <Button variant="contained" color="primary" onClick={handleModalOpen}>
                New Sprint
              </Button>
            </Grid>
          </Hidden>
        </Grid>
      </Grid>
      <Dialog open={modalOpen} onClose={handleModalClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Reset Sprint</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Warning! This action will delete all 'completed' user stories and move 'in-progress' cards to 'to-do'. Type
            <span style={{ color: 'red' }}> NEWSPRINT</span> in the field below and hit the 'confirm' button to start a
            new sprint.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            variant="filled"
            fullWidth
            onChange={e => setNewSprintInput(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleNewSprint}
            color="primary"
            variant="contained"
            disabled={newSprintInput !== 'NEWSPRINT'}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default observer(BoardHeader);
