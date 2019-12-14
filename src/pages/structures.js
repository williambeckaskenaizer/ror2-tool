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

  export default function Structures(){

    return (
      <MUIDataTable hover
        title={"Structures"}
        data={rows}
        columns={columns}
        options={options}
      />
    );
}

function createData(name, effect, base_cost, location){
    return [ name, effect, base_cost, location ];
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
    createData("Newt Altar", "Open a Blue Portal to the Bazaar Between Time upon defeating the Teleporter Boss", "1 Lunar Coin", "3 possible locations per Environment"),
    createData("Teleporter", "Upon activation, begins charging and spawns a Teleporter Boss. Once complete, allows travel to next Environment", "N/A", "12 possible locations per environment"),
    createData("Shrine of Chance", "Interacting with the Shrine will spend the shown amount at the bottom of the statue for a chance to receive an item of a random rarity.", "14", "Random"),
    createData("Shrine of Order", "Replaces all items of each rarity with copies of 1 item per rarity", "1 Lunar Coin", "Random")
  ];


const columns = [
  "Name","Effect", "Base Cost", "Location"
];