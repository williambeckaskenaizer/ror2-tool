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

  export default function Bosses(){

    const [items, setItems] = React.useState([{}]);

  useEffect(() => {

    fetch('http://localhost:8000/api/enemies', {
          method: 'GET',
          headers: {
          "Accept": "application/json",
          'Content-Type': 'application/json'
          }
    })
    .then(response => response.json())
    .then(data => {
      setItems(data.results);
    })
    .catch(err => { console.log("fetch error" + err); });

  }, []);

  return (
    <div>
      <MUIDataTable hover
        title={"Enemies"}
        data={items}
        columns={columns}
        options={options}
      />
    </div>
  );
}


const columns = [
  { label: "ID", name: "enemy_id" },
  { label: "Name", name: "enemy_name"}, 
  { label: "Health", name: "enemy_health"}, 
  { label: "Attack", name: "enemy_attack"},
  { label: "Speed", name: "enemy_speed"},
];