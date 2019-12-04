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

  export default function Chests(){

    return (
      <MUIDataTable hover
        title={"Chests"}
        data={rows}
        columns={columns}
        options={options}
      />
    );
}

function createData(name ,type, common_chance, uncommon_chance, legendary_chance, base_cost){
    return [ name ,type, common_chance, uncommon_chance, legendary_chance, base_cost ];
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
    createData("Chest", "White, Green, Red", "79.2%", "19.8%", "0.99%", "25g"),
    createData("Large Chest", "Green, Red", "0%", "80%", "20%", "50g"),
  ];

const columns = [
  "Chest Name","Item type", "Common Chance", "Uncommon Chance", "Legendary Chance" ,"Base Cost"
];