import React from 'react';
import { navigate } from 'hookrouter'
import MUIDataTable from "mui-datatables";

  const options = {
    filterType: "none",
    responsive: "scrollMaxHeight",
    selectableRows: "none",
    download: false,
    print: false,
    renderExpandableRow: (e) => handleClick(e),
    rowHover: false
  }

  export default function CharTable(){

    return (
      <MUIDataTable hover
        title={"Environments"}
        data={rows}
        columns={columns}
        options={options}
      />
    );
}

function createData(name, sequence, description){
    return [ name, sequence, description ];
}

function handleClick(event){
  console.log("clicked" + event)
  switch(event[0]){
    case 'Commando': navigate("/characters/commando", true)
    break;
    case 'Huntress': navigate("/characters/huntress", true)
    break;
    default: navigate("/characters",true)
  }
}

const rows = [
    createData("Distant Roost", "First", "Spires of earth jut through the fog and unknown avian creatures circle far peaks guarding their broods"),
    createData("Abandoned Aqueduct", "Second", "An arid, sprawling desert located on Providence"),
  ];

const columns = [
  "Name","Sequence","Description"
];