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
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

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

const BoardContentItem: React.FC = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        subheader="Bugfix role types when displayed on IE is different from other browsers."
      />
      <CardContent>
        <Chip color="default" size="small" label="Front-End" className={classes.label} />
      </CardContent>
      <CardActions>
        <Typography variant="caption" className={classes.dateStamp}>
          18/08/2019
        </Typography>
        <Chip color="primary" size="small" avatar={<Avatar>YL</Avatar>} label="You Liang" />
      </CardActions>
    </Card>
  );
};

export default BoardContentItem;
