import * as React from 'react';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { IssueType, resolveIssue } from '../api/issueApi';

/**
 * Individual issue content item component. Stores the issue details and displays it to the user
 */

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: 50,
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

const IssueContentItem: React.FC<{ issueDetails: IssueType }> = props => {
  const classes = useStyles();
  const { issueDetails } = props;
  const { title, description, issuer, status, date, key } = issueDetails;

  //returns a border status color based on status obtained from the issueDetails
  const getStatusColor = (status: string) => {
    if (status === 'unresolved') {
      return 'orange';
    }
    if (status === 'urgent') {
      return 'red';
    }
    if (status === 'resolved') {
      return 'green';
    }
  };

  //resolves an issue card upon clicking 'mark as resolved'
  const handleResolved = () => {
    resolveIssue(title, description, issuer, date, key);
  };

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        className={classes.root}
        style={{ borderLeft: `5px solid ${getStatusColor(status)}` }}
      >
        <Typography>{title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.expansionPanelDetails}>
        <Typography align="justify" paragraph color="textSecondary">
          {description}
        </Typography>
        <div>
          <Typography variant="caption">
            {`Issue raised by: ${issuer} on ${new Date(date).toLocaleDateString()} `}
          </Typography>
          {status !== 'resolved' && (
            <Typography variant="caption" className={classes.resolveButton} onClick={handleResolved}>
              Mark as resolved
            </Typography>
          )}
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default IssueContentItem;
