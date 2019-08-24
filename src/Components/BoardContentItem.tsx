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
import { UserStory } from '../Api/userStoryApi';

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

const BoardContentItem: React.FC<{ userStoryDetails: UserStory }> = props => {
  const classes = useStyles();
  const { userStoryDetails } = props;
  const { content, label, date, displayName } = userStoryDetails;

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton>
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
    </Card>
  );
};

export default BoardContentItem;
