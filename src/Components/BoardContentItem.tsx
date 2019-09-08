import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { UserStoryType, moveUserStory, deleteUserStory } from '../api/userStoryApi';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

/**
 * Individual user story card item which displays the details of the card
 */

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: theme.spacing(1),
  },
  dateStamp: {
    fontStyle: 'italic',
    flexGrow: 1,
  },
  label: {
    borderRadius: 3,
  },
}));

const BoardContentItem: React.FC<{ userStoryDetails: UserStoryType }> = props => {
  const classes = useStyles();
  const { userStoryDetails } = props;
  const { content, label, date, displayName, key, userId } = userStoryDetails;
  const [anchorEl, setAnchorEl] = React.useState(null); //to handle kebab menu
  const [moveCardMenuOpen, setMoveCardMenuOpen] = React.useState<boolean>(false); //to handle move card dialog
  const [newPhase, setNewPhase] = React.useState<string>('TO-DO'); //stores value of new selected phase
  const [deleteCardMenuOpen, setDeleteCardMenuOpen] = React.useState<boolean>(false); //to handle delete card dialog

  //handles the button click action in the kebab menu to display options
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  //closes the kebab menu options
  const handleClose = () => {
    setAnchorEl(null);
  };

  //opens a modal for users to move a card from one phase to another
  const handleOpenMoveMenu = () => {
    handleClose(); //closes kebab menu
    setMoveCardMenuOpen(true);
  };

  //closes the modal where users choose to move a card phase
  const handleCloseMoveMenu = () => {
    setMoveCardMenuOpen(false);
  };

  //opens a modal for users to delete a user story
  const handleOpenDeleteMenu = () => {
    handleClose(); //closes kebab menu
    setDeleteCardMenuOpen(true);
  };

  //closes the modal for users to delete a user story
  const handleCloseDeleteMenu = () => {
    setDeleteCardMenuOpen(false);
  };

  //api call to move a card phase based on the new phase selected in the openMoveMenu
  const handleMoveCard = () => {
    moveUserStory(content, userId, label, displayName, newPhase, date, key);
  };

  //api call to delete a card upon confirmation from the deleteMenu
  const handleDelete = () => {
    deleteUserStory(key);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        }
        subheader={content}
      />
      <CardContent>
        <Chip color="default" size="small" label={label} className={classes.label} />
      </CardContent>
      <CardActions>
        <Typography variant="caption" className={classes.dateStamp} color="textSecondary">
          {new Date(date).toLocaleDateString()}
        </Typography>
        <Chip color="primary" size="small" label={displayName} className={classes.label} />
      </CardActions>
      {/**Kebab mmenu ot display options for the feature card */}
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleOpenMoveMenu}>Move Card</MenuItem>
        <MenuItem onClick={handleOpenDeleteMenu}>Delete Card</MenuItem>
      </Menu>
      {/**Menu dialog to prompt user to change card phase */}
      <Dialog open={moveCardMenuOpen} onClose={handleCloseMoveMenu}>
        <DialogTitle>Change Card Phase</DialogTitle>
        <DialogContent>
          <DialogContentText>Move a card phase</DialogContentText>
          <TextField
            select
            value={newPhase}
            onChange={e => setNewPhase(e.target.value)}
            margin="normal"
            fullWidth
            variant="outlined"
          >
            <MenuItem value="TO-DO">TO DO</MenuItem>
            <MenuItem value="IN-PROGRESS">IN PROGRESS</MenuItem>
            <MenuItem value="TO-REVIEW">TO REVIEW</MenuItem>
            <MenuItem value="COMPLETED">COMPLETED</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMoveMenu} color="primary">
            Cancel
          </Button>
          <Button onClick={handleMoveCard} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {/**Menu dialog to confirm user for deletion of user story */}
      <Dialog open={deleteCardMenuOpen} onClose={handleCloseDeleteMenu}>
        <DialogTitle>Confirm Delete?</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDeleteMenu} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default BoardContentItem;
