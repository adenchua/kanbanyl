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
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Hidden from '@material-ui/core/Hidden';

/**
 * Board header used in the board page, which consists of a search bar, toggle sprint number and filter buttons
 */

const useStyles = makeStyles((theme: Theme) => ({
  sprintButton: {
    marginLeft: theme.spacing(2),
  },
  textField: {
    flexGrow: 1,
  },
  grid: {
    margin: theme.spacing(1, 2),
  },
  root: {
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
}));

const options = ['Sprint 1', 'Sprint 2', 'Sprint 3'];

const BoardHeader: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<any>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  function handleMenuItemClick(
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: React.SetStateAction<number>
  ) {
    setSelectedIndex(index);
    setOpen(false);
  }

  function handleToggle() {
    setOpen(prevOpen => !prevOpen);
  }

  function handleClose(event: { target: any }) {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  }

  return (
    <Grid container>
      <Grid item xs={12} className={classes.grid}>
        <Grid container alignItems="center">
          <Grid item className={classes.textField}>
            <ButtonGroup variant="contained" color="primary" ref={anchorRef}>
              <Button>{options[selectedIndex]}</Button>
              <Button
                color="primary"
                size="small"
                aria-owns={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
              >
                <ArrowDropDownIcon />
              </Button>
            </ButtonGroup>
            <Popper open={open} anchorEl={anchorRef.current} transition>
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList>
                    {options.map((option, index) => (
                      <MenuItem
                        key={option}
                        selected={index === selectedIndex}
                        onClick={event => handleMenuItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Popper>
          </Grid>
          <Grid item>
            <Typography variant="caption" color="textSecondary">
              0 Days Remaining
            </Typography>
          </Grid>
          <Hidden xsDown>
            <Grid item className={classes.sprintButton}>
              <Button variant="contained" color="primary">
                New Sprint
              </Button>
            </Grid>
          </Hidden>
        </Grid>
      </Grid>

      <Grid item xs={12} className={classes.grid}>
        <Grid container alignItems="center">
          <Grid item>
            <Paper className={classes.root}>
              <InputBase
                className={classes.input}
                placeholder="Search User Stories"
                inputProps={{ 'aria-label': 'search user stories' }}
              />
              <Divider className={classes.divider} />
              <IconButton className={classes.iconButton} aria-label="search" color="primary">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
          <Grid item>
            <Button variant="text" color="primary" className={classes.ml}>
              Filter
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BoardHeader;
