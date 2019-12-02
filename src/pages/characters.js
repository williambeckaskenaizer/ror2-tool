import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core'
import { navigate } from 'hookrouter'
import MaterialTable from 'material-table';

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

export default function MaterialTableDemo() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Surname', field: 'surname' },
      { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
      {
        title: 'Birth Place',
        field: 'birthCity',
        lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
      },
    ],
    data: [
      { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
      {
        name: 'Zerya Betül',
        surname: 'Baran',
        birthYear: 2017,
        birthCity: 34,
      },
    ],
  });

  return (
    <MaterialTable
      title="Editable Example"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}

function handleClick(event){
  console.log("cwicked!")
  switch(event){
    case 'Commando': navigate("/characters/commando", true)
    break;
    case 'Huntress': navigate("/characters/huntress", true)
    break;
    default: navigate("/characters",true)
  }
}

function handleKeyDown(e,k){
  if(e.key === 'Enter'){
    console.log("searched for:" + k)
  }
}

function filterTable(condition){
  
}



const rows = [
    createData("Commando", "Double Tap", "Phase Round", "Tactical Dive", "Suppressive Fire"),
    createData("Huntress", "Strafe", "Laser Glaive", "Blink", "Arrow Rain"),
  ];





  // export default function CharTable(){
  //     const classes = useStyles();

  //     return (
  //       <div>
  //         <main>
  //           <h1>Characters</h1>
  //         <TextField
  //           id="search"
  //           style={{ margin: 1 , width: 600}}
  //           placeholder="Search..."
  //           onKeyDown={(e,k) => handleKeyDown(e, e.target.value)}
  //           margin="normal"
  //           InputLabelProps={{
  //             shrink: true,
  //           }}
  //         />
  //       </main>
  //       <Paper className={classes.root}>
  //         <Table className={classes.table} aria-label="simple table">
  //           <TableHead>
  //             <TableRow>
  //               <TableCell align="left">Surivor Name</TableCell>
  //               <TableCell align="left">Primary</TableCell>
  //               <TableCell align="left">Secondary</TableCell>
  //               <TableCell align="left">Tactical</TableCell>
  //               <TableCell align="left">Ult</TableCell>
  //             </TableRow>
  //           </TableHead>
  //           <TableBody>
  //             {rows.map(row => (
  //               <TableRow key={row.name} hover onClick={() => handleClick(row.name)}>
  //                 <TableCell align="left">{row.name}</TableCell>
  //                 <TableCell align="left">{row.primary}</TableCell>
  //                 <TableCell align="left">{row.secondary}</TableCell>
  //                 <TableCell align="left">{row.tactical}</TableCell>
  //                 <TableCell align="left">{row.ult}</TableCell>
  //               </TableRow>
  //             ))}
  //           </TableBody>
  //         </Table>
  //       </Paper>
  //       </div>
  //     );
  // }