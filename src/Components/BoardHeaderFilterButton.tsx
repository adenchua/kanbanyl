import * as React from 'react';
import Button from '@material-ui/core/Button';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import { observer } from 'mobx-react';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { userStoryStore } from '../index';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

/**
 * Returns a filter button and a menu component to filter tags
 */

const useStyles = makeStyles((theme: Theme) => ({
  ml: {
    marginLeft: theme.spacing(1),
  },
}));

const BoardHeaderFilterButton = () => {
  const [anchorEl, setAnchorEl] = React.useState(null); // handle menu open
  const [displayNameFilters, setDisplayNameFilters] = React.useState<string[]>([]); //to store selected display names
  const [checked, setChecked] = React.useState();
  const [labelFilters, setLabelFilters] = React.useState<string>('--'); //to store selected filters
  const classes = useStyles({});

  const handleSubmit = () => {
    userStoryStore.setUserStoryAuthorFilter(displayNameFilters); //set display name filters to store

    if (labelFilters !== '--') {
      userStoryStore.setUserStoryLabelFilter(labelFilters);
    }
    if (labelFilters === '--') {
      userStoryStore.setUserStoryLabelFilter('');
    }
  };

  const handleChange = (name: any) => (event: any) => {
    setChecked({ ...checked, [name]: event.target.checked }); //toggle checkbox status
    let newDisplayNameList = displayNameFilters;

    if (newDisplayNameList.indexOf(name) === -1) {
      newDisplayNameList.push(name);
    } else {
      newDisplayNameList.splice(newDisplayNameList.indexOf(name), 1);
    }
    setDisplayNameFilters(newDisplayNameList);
  };

  function handleClick(event: any) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <React.Fragment>
      <Button variant="text" color="primary" className={classes.ml} onClick={handleClick}>
        Filter
      </Button>
      <Popper anchorEl={anchorEl} open={Boolean(anchorEl)} placement="right">
        <Paper style={{ minWidth: 260 }}>
          <div style={{ padding: 16 }}>
            <Typography color="primary">Filter by users: </Typography>
            <FormGroup>
              {userStoryStore.getUserStoryDisplayNames.map(displayName => {
                return (
                  <FormControl key={displayName}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={displayName}
                          onChange={handleChange(displayName)}
                          checked={displayNameFilters.includes(displayName)}
                        />
                      }
                      label={displayName}
                    />
                  </FormControl>
                );
              })}
              {userStoryStore.getUserStoryDisplayNames.length === 0 && (
                <Typography variant="caption" color="textSecondary">
                  No users to filter
                </Typography>
              )}
            </FormGroup>
            <Divider />
            <Typography color="primary">Filter by labels: </Typography>
            <TextField
              select
              value={labelFilters}
              onChange={e => setLabelFilters(e.target.value)}
              margin="normal"
              fullWidth
              variant="outlined"
            >
              <MenuItem value="--">--</MenuItem>
              <MenuItem value="Team 1">Team 1</MenuItem>
              <MenuItem value="Team 2">Team 2</MenuItem>
              <MenuItem value="Team 3">Team 3</MenuItem>
              <MenuItem value="Team 4">Team 4</MenuItem>
              <MenuItem value="Team 5">Team 5</MenuItem>
              <MenuItem value="Frontend">Frontend</MenuItem>
              <MenuItem value="Backend">Backend</MenuItem>
            </TextField>
            <Divider />
            <Grid container justify="flex-end" style={{ marginTop: 8 }}>
              <Button onClick={handleClose} variant="text" color="inherit">
                Cancel
              </Button>
              <Button onClick={handleSubmit} variant="text" color="primary">
                Apply
              </Button>
            </Grid>
          </div>
        </Paper>
      </Popper>
    </React.Fragment>
  );
};

export default observer(BoardHeaderFilterButton);
