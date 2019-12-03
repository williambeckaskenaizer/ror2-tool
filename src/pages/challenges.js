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
    expandableRows: true,
    rowHover: false
  }

  export default function Challenges(){

    return (
      <MUIDataTable hover
        title={"Challenges"}
        data={rows}
        columns={columns}
        options={options}
      />
    );
}

function createData(challenge, description, unlocks){
    return [ challenge, description, unlocks ];
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
    createData("Warrior", "Reach and complete the 3rd Teleporter event without dying", "The Huntress"),
    createData("Verified", "Complete the first Teleporter event 5 times", "MUL-T"),
  ];

const columns = [
  "Challenge","Description","Unlocks"
];