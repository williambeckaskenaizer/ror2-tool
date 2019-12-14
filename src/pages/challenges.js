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

  export default function Challenges(){

    const [items, setItems] = React.useState([{}]);

    useEffect(() => {
  
      fetch('http://localhost:8000/api/challenges', {
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
          title={"Challenges"}
          data={items}
          columns={columns}
          options={options}
        />
      </div>
    );
  }
  
  
  const columns = [
    { label: "ID", name: "challenge_id" },
    { label: "Name", name: "challenge_name"}, 
    { label: "Description", name: "challenge_desc"}, 
    { label: "Unlocks", name: "challenge_unlock"},
    { label: "Unlock Type", name: "unlock_type"}
  ];