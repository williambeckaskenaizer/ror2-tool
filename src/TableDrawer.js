import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { navigate } from 'hookrouter'


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});


export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };



  function handler(text) {
    if (text === 'Characters') {
      //con
      navigate("/characters", true)
    }
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
      default : navigate("/home", true)
      break;
    }
  }

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
    <List>
      {['Home','Characters', 'Items', 'Environments', 'Enemies', 'Logs', 'Bosses', 'Chests', 'Challenges', 'Abilities', 'NPCs'].map((text, index) => (
        <ListItem button key={text} onClick={() => handler(text)}>
          <ListItemText primary={text} />
        </ListItem>
      ))}
      </List>
    </div>
  );

  return (
    <div>
      <Button onClick={toggleDrawer('left', true)}>Choose Table</Button>
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
    </div>
  );
}




// {['Characters', 'Items', 'Environments', 'Enemies', 'Logs','Bosses', 'Chests', 'Challenges', 'Abilities', 'NPCs'].map((text, index) => (
//   <ListItem button key={text}>
//     <ListItemText primary={text} />
//   </ListItem>
// ))}