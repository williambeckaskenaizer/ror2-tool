import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    justifySelf: "center"
  },
  media: {
    height: 140,
  },
  paper: {
    textAlign:"left",
    padding: theme.spacing(0.8),
    color: theme.palette.text.white,
    margin: 3
  },
}));

export default function MediaCard() {
  const classes = useStyles();

  function FormRow() {
    return (
      <React.Fragment>
        <Grid item xs={1.8}>
          <Paper> <img className={classes.img} src={require('../images/commandoprofile.jpg')} alt="lol" width="250px" /></Paper>
        </Grid>
        <Grid item xs={1} sm={1.8}>
          <Paper className={classes.paper}><img className={classes.img} src={require('../images/Double_Tap.png')} alt="lol" width="69px" /></Paper>
          <Paper className={classes.paper}><img className={classes.img} src={require('../images/Phase_Round.png')} alt="lol" width="69px" /></Paper>
          <Paper className={classes.paper}><img className={classes.img} src={require('../images/Suppressive_Fire.png')} alt="lol" width="69px" /></Paper>
          <Paper className={classes.paper}><img className={classes.img} src={require('../images/Tactical_Dive.png')} alt="lol" width="69px" /></Paper>
        </Grid>
        <Grid item xs={8} sm={6}>
          <Paper className={classes.paper}><h3>Double Tap</h3>Shoot twice for 2x90% damage.</Paper>
          <Paper className={classes.paper}><h3>Phase Round</h3>Fire a piercing bullet that hits all enemies in a line for 230% damage.</Paper>
          <Paper className={classes.paper}><h3>Tacticool Dive</h3>Roll a short distance.</Paper>
          <Paper className={classes.paper}><h3>Suppressive Fire</h3>Fire rapidly, stunning enemies for 100% damage per shot. Fires more shots based on attack speed, with default six.
</Paper>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <div>
      <h1>The Commando</h1>
    <Grid container spacing={1} >
  <Grid container item xs={10} spacing={0} alignItems="center">
    <FormRow />
  </Grid>
</Grid>
  </div>
  );
}


