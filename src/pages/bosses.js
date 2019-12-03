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

  export default function Bosses(){

    return (
      <MUIDataTable hover
        title={"Bosses"}
        data={rows}
        columns={columns}
        options={options}
      />
    );
}

function createData(name, health, damage, speed, armor){
    return [ name, health, damage, speed, armor ];
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
    createData("Imp Overlord", "2800 (+840 per level)", "16 (+3.2 per level)", "13 m/s", "20"),
    createData("Beetle Queen", "2100 (+630 per level)", "25(+5 per level)", "6 m/s", "20"),
  ];

const columns = [
  "Name","Health","Damage","Speed","Armor"
];