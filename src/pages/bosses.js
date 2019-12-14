import React,{useEffect} from 'react';
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

    fetch('http://localhost:8000/api/bosses', {
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
        title={"Bosses"}
        data={items}
        columns={columns}
        options={options}
      />
    </div>
  );
}


const columns = [
  { label: "ID", name: "boss_id" },
  { label: "Name", name: "boss_name"}, 
  { label: "Health", name: "boss_health"}, 
  { label: "Attack", name: "boss_attack"},
  { label: "Speed", name: "boss_speed"},
  { label: "Armor", name: "boss_armor"},
  
];