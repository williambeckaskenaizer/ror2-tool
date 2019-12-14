import React, {useEffect} from 'react';
import { navigate } from 'hookrouter'
import MUIDataTable from "mui-datatables";

  const options = {
    filterType: "none",
    responsive: "scrollMaxHeight",
    selectableRows: "none",
    download: false,
    print: false,
    rowHover: false
  }

  export default function Chests(){

    const [items, setItems] = React.useState([{}]);

  useEffect(() => {

    fetch('http://localhost:8000/api/chests', {
          method: 'GET',
          headers: {
          "Accept": "application/json",
          'Content-Type': 'application/json'
          }
    })
    .then(response => response.json())
    .then(data => {
      //console.log(data);
      //const test = [];
      setItems(data.results);
      //console.log(items);
    })
    .catch(err => { console.log("fetch error" + err); });

  }, []);

  return (
    <div>
      <MUIDataTable hover
        title={"Items"}
        data={items}
        columns={columns}
        options={options}
      />
    </div>
  );
}



const columns = [
  { label: "ID", name: "chest_id" },
  { label: "Name", name: "chest_name" }, 
  { label: "Item Type", name: "chest_item_type" }, 
  { label: "Possible Rarity", name: "chest_possible_rarity" }, 
  { label: "White Chance", name: "chest_white_chance" },
  { label: "Green Chance", name:"chest_green_chance"},
  { label: "Red Chance", name: "chance_red_chance" },
  { label: "Base Cost", name: "cance_base_cost" },
];
