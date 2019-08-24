import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import firebase from 'firebase';
import { Link as RouterLink } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme: Theme) => ({
  mt: {
    marginTop: theme.spacing(5),
  },
  mr: {
    marginRight: theme.spacing(2),
  },
  paper: {
    padding: 20,
  },
}));

const ProfilePage = () => {
  React.useEffect(() => {
    var user = firebase.auth().currentUser;
    if (user != null && user.displayName !== null) {
      setDisplayNameInput(user.displayName);
    }
    if (user != null && user.photoURL !== null) {
      setPhotoURLInput(user.photoURL);
    }
  }, []);

  const classes = useStyles();
  const [displayNameInput, setDisplayNameInput] = React.useState<string>('');
  const [photoURLInput, setPhotoURLInput] = React.useState<string>('');

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    var user = firebase.auth().currentUser;

    if (user !== null) {
      user
        .updateProfile({
          displayName: displayNameInput,
          photoURL: photoURLInput,
        })
        .then(function() {
          //update successful
          alert('User Profile Updated!');
        })
        .catch(function(error) {
          alert('An error occured, try again later');
        });
    }
  };

  return (
    <Container maxWidth="md" className={classes.mt}>
      <Paper className={classes.paper}>
        <Typography variant="h6" paragraph color="primary">
          Update Profile Information
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Display Name"
            variant="outlined"
            onChange={e => setDisplayNameInput(e.target.value)}
            value={displayNameInput}
            inputProps={{ maxLength: 12 }}
            helperText={`${12 - displayNameInput.length} characters remaining`}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Avatar URL"
            variant="outlined"
            value={photoURLInput}
            helperText="This will be displayed on all your posts"
            onChange={e => setPhotoURLInput(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Grid container justify="flex-end" className={classes.mt}>
            <Button variant="outlined" color="primary" className={classes.mr} component={RouterLink} to="/board">
              Cancel
            </Button>
            <Button type="submit" color="primary" variant="contained">
              Update Profile
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
