import React from "react";
import "./App.css";
import InputTextField from "./components/InputTextField";

const idb = window.indexedDB;

const createCollectionsInIndexedDB = () => {
  if (!idb) {
    console.log("This browser does  not support IndexedDB");
    return;
  }
  console.log(idb);

  const request = idb.open("test-db", 2);

  request.onerror = (event) => {
    console.log("Error", event);
    console.log("An error occured");
  };

  request.onupgradeneeded = (event) => {
    const db = request.result;
    if (!db.objectStoreNames.contains("userData")) {
      db.createObjectStore("userData", {
        keyPath: "id",
      });
    }
  };

  request.onsuccess = () => {
    console.log("Database opened successfully");
  };
};

const App = () =>
{
  const [name, setName] = React.useState( '' );
  const [id, setId] = React.useState( "" );
  const [role, setRole] = React.useState( "" );
  const [salary, setSalary] = React.useState( "" );
  
  const onChangeName = ( event ) => setName( event.target.value );
  const onChangeRole = ( event ) => setRole( event.target.value )
  const onChangeSalary =(event)=>setSalary(event.target.value)
  React.useEffect(() => {
    createCollectionsInIndexedDB();
  }, []);
  return <div className="App">
    <InputTextField value={ name } label="Add Name" onchangeValue={ onChangeName } />
    <InputTextField value={ role } label="Add role" onchangeValue={ onChangeRole } />
    <InputTextField value={salary} label="Add salary" onchangeValue={onChangeSalary}/>
  </div>;
};

export default App;
