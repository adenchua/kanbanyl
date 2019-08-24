import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import firebase from 'firebase';
import { createUserStory } from '../Api/userStoryApi';

const CardCreationContent = () => {
  const [content, setContent] = React.useState<string>('');
  const [label, setLabel] = React.useState<string>('none');

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    var user = firebase.auth().currentUser;
    if (user) {
      let displayName = user.displayName ? user.displayName : 'Anonymous';
      let userId = user.uid;
      createUserStory(content, userId, label, displayName);
      console.log('card created!');
    }
  };
  return (
    <Paper style={{ padding: 20 }}>
      <Typography variant="h6" color="primary">
        Create User Story
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Card Content"
          value={content}
          onChange={e => setContent(e.target.value)}
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          rowsMax={3}
          inputProps={{ maxLength: 140 }}
          helperText={`${140 - content.length} characters remaining`}
          required
          margin="normal"
        />
        <TextField
          select
          label="Card Label"
          value={label}
          onChange={e => setLabel(e.target.value)}
          margin="normal"
          fullWidth
          variant="outlined"
        >
          <MenuItem value="none">None</MenuItem>
          <MenuItem value="Front-End">Front-End</MenuItem>
          <MenuItem value="Back-End">Back-End</MenuItem>
          <MenuItem value="Machine Learning">Machine Learning</MenuItem>
        </TextField>
        <Grid container justify="flex-end">
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </form>
    </Paper>
  );
};

export default CardCreationContent;
