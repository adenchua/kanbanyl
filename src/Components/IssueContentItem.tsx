import * as React from 'react';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

/**
 * Individual issue content item component. Stores the issue details and displays it to the user
 */

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: 50,
    borderLeft: '5px solid orange',
  },
  resolveButton: {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  expansionPanelDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const IssueContent = () => {
  const classes = useStyles();

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={classes.root}>
        <Typography>
          Bug encounted somewhere in the codes, can't seem to render news article when changed to new endpoint
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.expansionPanelDetails}>
        <Typography align="justify" paragraph color="textSecondary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo
          lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
          amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
          lacus ex, sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography>
        <div>
          <Typography variant="caption">Issue raised by: You Liang on 24/09/2019 - </Typography>
          <Typography variant="caption" className={classes.resolveButton}>
            Mark as resolved
          </Typography>
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default IssueContent;
