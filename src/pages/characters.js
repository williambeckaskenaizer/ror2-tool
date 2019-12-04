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

export default function CharTable() {

  return (
    <MUIDataTable hover
      title={"Characters"}
      data={rows}
      columns={columns}
      options={options}
    />
  );
}

function createData(name, primary, secondary, tactical, ult) {
  return [name, primary, secondary, tactical, ult];
}

function handleClick(event) {
  console.log("clicked" + event)
  switch (event[0]) {
    case 'Commando': navigate("/characters/commando", true)
      break;
    case 'Huntress': navigate("/characters/huntress", true)
      break;
    default: navigate("/characters", true)
  }
}

const rows = [
  createData("Commando", "Double Tap", "Phase Round", "Tactical Dive", "Suppressive Fire"),
  createData("Huntress", "Strafe", "Laser Glaive", "Blink", "Arrow Rain"),
];

const columns = [
  "Surivior", "Primary", "Secondary", "Tacticool", "Ultimate"
];