import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import firebase from 'firebase';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import WidgetIcon from '@material-ui/icons/WidgetsRounded';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core';

/**
 * Contains the login page for the users to sign in with an email and a password. Upon success,
 * it redirects the user to the board page.
 */

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/daily?office)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'orange',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  title: {
    color: 'orange',
  },
}));

const LoginPage = (props: { history: string[] }) => {
  const classes = useStyles({}); //Material UI CSS Style
  const [email, setEmail] = React.useState<string>(''); //state to store email input
  const [password, setPassword] = React.useState<string>(''); //state to store password input
  const [showError, setShowError] = React.useState<boolean>(false); //state to show error message should login fail

  // performs handle submit of the login form. Calls Firebase's auth sign in with email and password method.
  // Upon successful login, redirects user to another page
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setShowError(false);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        var user = response.user;
        if (user !== null) {
          console.log(user.displayName);
          console.log(user.photoURL);
        }
        props.history.push('/board'); //redirects to BoardPage
      })
      .catch(error => {
        setShowError(true); //display error
        console.log(error);
      });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <WidgetIcon />
          </Avatar>
          <Typography component="h1" variant="h5" className={classes.title}>
            kanbanyl
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={email}
              onChange={e => setEmail(e.target.value)}
              label="Email Address"
              autoComplete="email"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={password}
              onChange={e => setPassword(e.target.value)}
              label="Password"
              type="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
          </form>
          {showError && <Typography color="error">Invalid email/password</Typography>}
        </div>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
