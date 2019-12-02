import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { navigate, useRoutes } from 'hookrouter'
import routes from './navigation/router'


const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

function PermanentDrawerLeft() {
  const routeResult = useRoutes(routes);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            RoR2 Tool
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
        {['Home','Characters', 'Items', 'Environments', 'Enemies', 'Logs', 'Bosses', 'Chests', 'Challenges', 'Abilities', 'NPCs'].map((text, index) => (
        <ListItem button key={text} onClick={() => handler(text)}>
          <ListItemText primary={text} />
        </ListItem>
      ))}
      </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {routeResult}
      </main>
    </div>
  );
}

  function handler(text) {
    switch (text){
      case 'Home' : navigate("/home", true)
      break;
      case 'Characters': navigate("/characters", true) 
      break;
      case 'Items' : navigate("/items", true)
      break;
      case 'Environments': navigate("/environments")
      break;
      case 'Enemies' : navigate("/enemies", true)
      break;
      case 'Logs' : navigate("/logs")
      break;
      case 'Bosses': navigate("/bosses", true)
      break;
      case 'Chests' : navigate("/chests", true)
      break;
      case 'Challenges' : navigate("/challenges", true)
      break;
      case 'Abilities' : navigate("/abilities", true)
      break;
      case 'NPCs' : navigate("/npcs")
      break;
      default : navigate("/", true)
      break;
    }
  }

export default PermanentDrawerLeft;
  // <List>
  //     {['Home','Characters', 'Items', 'Environments', 'Enemies', 'Logs', 'Bosses', 'Chests', 'Challenges', 'Abilities', 'NPCs'].map((text, index) => (
  //       <ListItem button key={text} onClick={() => handler(text)}>
  //         <ListItemText primary={text} />
  //       </ListItem>
  //     ))}
  //     </List>