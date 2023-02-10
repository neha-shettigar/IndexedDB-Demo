import React from 'react';
import './App.css';
import InputTextField from './components/InputTextField';
import Button from './components/Button';

const idb = window.indexedDB;

const createCollectionsInIndexedDB = () => {
  if (!idb) {
    console.log('This browser does  not support IndexedDB');
    return;
  }
  console.log(idb);

  const request = idb.open('test-db', 2);

  request.onerror = (event) => {
    console.log('Error', event);
    console.log('An error occured');
  };

  request.onupgradeneeded = (event) => {
    const db = request.result;
    if (!db.objectStoreNames.contains('userData')) {
      db.createObjectStore('userData', {
        keyPath: 'id',
      });
    }
  };

  request.onsuccess = () => {
    console.log('Database opened successfully');
  };
};

const App = () => {
  const [name, setName] = React.useState('');
  const [id, setId] = React.useState('');
  const [role, setRole] = React.useState('');
  const [salary, setSalary] = React.useState('');
  const [allEmployeeData, setallEmployeeData] = React.useState([]);
  const [addEmployee, setAddEmployee] = React.useState(false);
  const [removeEmployee, setRemoveEmployee] = React.useState(false);
  const [updateEmployee, setUpdateEmployee] = React.useState(false);
  const [selectedEmployee, setSelectedEmployee] = React.useState({});

  const onChangeName = (event) => setName(event.target.value);
  const onChangeRole = (event) => setRole(event.target.value);
  const onChangeSalary = (event) => setSalary(event.target.value);
 
  React.useEffect(() => {
    createCollectionsInIndexedDB();
    getAllData();
  }, []);
  const getAllData = () => {
    const dbPromise = idb.open('test-db', 2);
    dbPromise.onsuccess = () => {
      const db = dbPromise.result;
      const transaction = db.transaction('userData', 'readonly');
      const userData = transaction.objectStore('userData');
      const users = userData.getAll();
      users.onsuccess = (query) => {
        setallEmployeeData(query.srcElement.result);
      };
      users.onerror = (query) => {
        alert('Error while loading');
      };
    };
  };
   const onSubmit = (event) => {
     const dbPromise = idb.open('test-db', 2);
     console.log(addEmployee, updateEmployee);
     if (name && role && salary) {
       dbPromise.onsuccess = () => {
         const db = dbPromise.result;
         const transaction = db.transaction('userData', 'readwrite');
         const userData = transaction.objectStore('userData');
         console.log(addEmployee, updateEmployee);

         if (addEmployee) {
           const users = userData.put({
             id: allEmployeeData?.length + 1,
             name,
             role,
             salary,
           });
           users.onsuccess = (query) => {
             transaction.oncomplete = () => {
               db.close();
             };
             alert('Employee added');
             setName('');
             setRole('');
             setSalary('');
             setUpdateEmployee(false);
             getAllData();
             event.preventDefault();
           };
           users.onerror = (event) => {
             console.log(event);
             alert('Error occured');
           };
         } else {
           const users = userData.put({
             id: selectedEmployee?.id,
             name,
             role,
             salary,
           });
           users.onsuccess = (query) => {
             transaction.oncomplete = () => {
               db.close();
             };
             alert('Employee updated');
             setName('');
             setRole('');
             setSalary('');
             setAddEmployee(false);
             getAllData();
             event.preventDefault();
           };
           users.onerror = (event) => {
             console.log(event);
             alert('Error occured');
           };
         }
       };
     }
   };
  const removeData = (user) => {
    const dbPromise = idb.open('test-db', 2);
    dbPromise.onsuccess = () => {
      const db = dbPromise.result;
      const transaction = db.transaction('userData', 'readwrite');
      const userData = transaction.objectStore('userData');
      const deleteUsers = userData.delete(user?.id);
      deleteUsers.onsuccess = (query) => {
        alert('Employee deleted');
        console.log(removeData)
        getAllData();
      };
      deleteUsers.onerror = (query) => {
        alert('Error while loading');
        getAllData();
      };
    };
  };
  return (
    <div className='App'>
      <h1>Employee Details</h1>
      <Button
        onClickButton={() => {
          setAddEmployee(true);
          setUpdateEmployee(false);
          setSelectedEmployee({});
          setName('');
          setRole('');
          setSalary('');
        }}
        label='Add'
      />
      {addEmployee || updateEmployee ? (
        <section className='App__section'>
          <h3>
            {addEmployee ? 'Add Employee Details' : 'Update Employee Details'}
          </h3>
          <InputTextField
            value={name}
            label='Name: '
            onchangeValue={onChangeName}
          />
          <InputTextField
            value={role}
            label='Role: '
            onchangeValue={onChangeRole}
          />
          <InputTextField
            value={salary}
            label='Salary: '
            onchangeValue={onChangeSalary}
          />
          <Button
            onClickButton={onSubmit}
            label={addEmployee ? 'Add' : 'Update'}
          />{' '}
        </section>
      ) : null}

      <table className='App__table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody className='App_table-body'>
          {allEmployeeData?.map((user) => {
            return (
              <tr key={user?.id}>
                <td>{user?.name}</td>
                <td>{user?.role}</td>
                <td>{user?.salary}</td>
                <td>
                  <Button
                    onClickButton={() => {
                      setRemoveEmployee(true);
                      removeData(user);
                    }}
                    label='Remove'
                  />
                </td>
                <td>
                  <Button
                    onClickButton={() => {
                      setUpdateEmployee(true);
                      setAddEmployee(false);
                      setSelectedEmployee(user);
                      setName(user?.name);
                      setRole(user?.role);
                      setSalary(user?.salary);
                    }}
                    label='Update'
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
