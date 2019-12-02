import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core'

const useStyles = makeStyles({
    root: {
      width: '100%',
      overflowX: 'auto',
    },
    table: {
      minWidth: 650,
    },
  });

function createData(name, primary, secondary, tactical, ult){
  //const classes = useStyles();
//    componentDidMount() {
//        console.log('here!')
    return { name, primary, secondary, tactical, ult };
}

function handleClick(event){
  console.log("cwicked!")
}



const rows = [
    createData("Commando", "Double Tap", "Phase Round", "Tactical Dive", "Suppressive Fire"),
    createData("Huntress", "Strafe", "Laser Glaive", "Blink", "Arrow Rain"),
  ];

  export default function CharTable(){
      const classes = useStyles();

      return (
        <div>
          <main>
            <h1>Characters</h1>
          <TextField
            id="search"
            style={{ margin: 1 , width: 600}}
            placeholder="Search..."
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </main>
        <Paper className={classes.root}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Surivor Name</TableCell>
                <TableCell align="left">Primary</TableCell>
                <TableCell align="left">Secondary</TableCell>
                <TableCell align="left">Tactical</TableCell>
                <TableCell align="left">Ult</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.name} hover>
                  <TableCell align="left" onClick={(e) => handleClick(e)}>{row.name}</TableCell>
                  <TableCell align="left">{row.primary}</TableCell>
                  <TableCell align="left">{row.secondary}</TableCell>
                  <TableCell align="left">{row.tactical}</TableCell>
                  <TableCell align="left">{row.ult}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        </div>
      );
  }