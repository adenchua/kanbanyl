import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { Link as RouterLink } from 'react-router-dom';
import { createIssue } from '../api/issueApi';
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';

/**
 * This file returns the form for users to create an issue
 */

const IssueCreationContent = (props: any) => {
  const [title, setTitle] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [isUrgent, setIsUrgent] = React.useState<boolean>(false);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    var user = firebase.auth().currentUser;
    if (user) {
      let displayName = user.displayName ? user.displayName : 'Anonymous';
      createIssue(title, description, displayName, isUrgent ? 'urgent' : 'unresolved');
      props.history.push('/issues');
    }
  };
  return (
    <Paper style={{ padding: 20 }}>
      <Typography variant="h6" color="primary">
        Raise New Issue
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          variant="outlined"
          fullWidth
          inputProps={{ maxLength: 130 }}
          helperText={`${130 - title.length} characters remaining`}
          required
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          variant="outlined"
          fullWidth
          multiline
          rows={5}
          rowsMax={5}
          inputProps={{ maxLength: 620 }}
          helperText={`${620 - description.length} characters remaining`}
          required
          margin="normal"
        />
        <FormControlLabel
          control={<Switch onChange={e => setIsUrgent(e.target.checked)} value={isUrgent} />}
          label="Set Urgent"
          labelPlacement="start"
        />
        <Grid container justify="flex-end">
          <Button variant="outlined" color="primary" style={{ marginRight: 8 }} component={RouterLink} to="/issues">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </form>
    </Paper>
  );
};

export default withRouter(IssueCreationContent);
