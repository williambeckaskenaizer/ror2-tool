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

  export default function CharTable(){

    const [items, setItems] = React.useState([{}]);

  useEffect(() => {

    fetch('http://localhost:8000/api/environments', {
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
        title={"Environments"}
        data={items}
        columns={columns}
        options={options}
      />
    </div>
  );
}


const columns = [
  { label: "ID", name: "environment_id" },
  { label: "Name", name: "environment_name"}, 
  { label: "Stage Number", name: "stage_number"}, 
  { label: "Description", name: "environment_description"},
];