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

export default function CharTable() {

  const [items, setItems] = React.useState([{}]);

  useEffect(() => {

    fetch('http://localhost:8000/api/survivors', {
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
        title={"Characters"}
        data={items}
        columns={columns}
        options={options}
      />
    </div>
  );
}

function createData(item, rarity, description, unlocked_by, category) {
  return [item, rarity, description, unlocked_by, category];
}

const testData = [
  {name: "Gabby George", title: "Business Analyst", location: "Minneapolis", age: 30, salary: "$100,000"}
];


const columns = [
  { label: "ID", name: "survivor_id" },
  { label: "Name", name: "survivor_name" }, 
  { label: "Health", name: "survivor_regen" }, 
  { label: "Damage", name: "survivor_damage" }, 
  { label: "Speed", name: "survivor_speed" },
  { label: "Armor", name:"survivor_armor"}
];




