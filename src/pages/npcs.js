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

  export default function Challenges(){

    return (
      <MUIDataTable hover
        title={"NPCs"}
        data={rows}
        columns={columns}
        options={options}
      />
    );
}

function createData(name, location){
    return [ name, location ];
}

function handleClick(event){
  console.log("clicked" + event)
  switch(event[0]){
    default: navigate("/npcs",true)
  }
}

const rows = [
    createData("Hanging Skeleton", "Alter to N'Kuhana, Wetland Aspect"),
    createData("Newt", "Bazaar Between Time"),
  ];

const columns = [
  "Name", "Location"
];