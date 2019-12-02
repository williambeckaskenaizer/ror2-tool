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

function createData(Name, Health, Attack, Speed, Armor){
//    componentDidMount() {
//        console.log('here!')
    return { Name, Health, Attack, Speed, Armor};
}

const rows = [
    createData("Beetle Queen", "2100 (+ 630 Per Level)", "25 ( + 5 Per Level)", 6, 20),
    createData("Grovetender", "2800 ( + 840 Per Level)", "23 ( + 4.6 Per Level)", 10, 20)
]

  export default function AbilityTable(){
      const classes = useStyles();

      return (
        <Paper className={classes.root}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Boss</TableCell>
                <TableCell align="left">Health</TableCell>
                <TableCell align="left">Damage</TableCell>
                <TableCell align="left">Speed</TableCell>
                <TableCell align="left">Armor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.name}>
                  <TableCell align="left">{row.Name}</TableCell>
                  <TableCell align="left">{row.Health}</TableCell>
                  <TableCell align="left">{row.Attack}</TableCell>
                  <TableCell align="left">{row.Speed}</TableCell>
                  <TableCell align="left">{row.Armor}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      );
  }