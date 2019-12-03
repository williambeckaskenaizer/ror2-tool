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
        title={"Items"}
        data={rows}
        columns={columns}
        options={options}
      />
    );
}

function createData(items, rarity, description, unlocked_by, category){
    return [ items, rarity, description, unlocked_by, category ];
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
    createData("Soldier's Syringe", "Common", "Increases attack speed by 15%. (+15% per stack)", "Default", "Attack"),
    createData("Tougher Times", "Common", "15% (+15% per stack) chance to block incoming damage. Unaffected by the luck", "Learning Process", "Defense"),
  ];

const columns = [
  "Name","Rarity","Description","Unlocked By","Category"
];