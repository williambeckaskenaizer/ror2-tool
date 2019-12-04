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

  export default function Bosses(){

    return (
      <MUIDataTable hover
        title={"Enemies"}
        data={rows}
        columns={columns}
        options={options}
      />
    );
}

function createData(name, health, health_regen, damage, speed, armor){
    return [ name, health, health_regen, damage, speed, armor ];
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
    createData("Alloy Vulture", "200 (+60 per level)", "0.6 (+0.12 per level) hp/s", "15(+3 per level)", "3 m/s", "0"),
    createData("Beetle", "80 (+24 per level)", "N/A", "12(+2.4 per level)", "6 m/s", "N/A"),
  ];

const columns = [
  "Name","Health", "Health Regen", "Damage", "Speed", "Armor"
];