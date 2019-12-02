import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      width: '100%',
      overflowX: 'auto',
    },
    table: {
      minWidth: 650,
    },
  });

function createData(Name, Survivor, Desc, Proc){
//    componentDidMount() {
//        console.log('here!')
    return { Name, Survivor, Desc, Proc };
}

const rows = [
    createData("Double Tap", "Commando", "Shoot twice for 2x90% damage", 1),
    createData("Phase Blase", "Commando", "Fires two close-range blasts for 8*200% damage", 1)
]

  export default function AbilityTable(){
      const classes = useStyles();

      return (
        <Paper className={classes.root}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Ability</TableCell>
                <TableCell align="left">Survivor</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Proc</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.name}>
                  <TableCell align="left">{row.Name}</TableCell>
                  <TableCell align="left">{row.Survivor}</TableCell>
                  <TableCell align="left">{row.Desc}</TableCell>
                  <TableCell align="left">{row.Proc}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      );
  }