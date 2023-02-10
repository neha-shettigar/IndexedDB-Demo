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
  const [allUsersData, setAllUsersData] = React.useState([]);

  const onChangeName = (event) => setName(event.target.value);
  const onChangeRole = (event) => setRole(event.target.value);
  const onChangeSalary = (event) => setSalary(event.target.value);
  const onSubmit = (event) => {
    const dbPromise = idb.open('test-db', 2);
    if (name && role && salary) {
      dbPromise.onsuccess = () => {
        const db = dbPromise.result;
        const transaction = db.transaction('userData', 'readwrite');
        const userData = transaction.objectStore('userData');
        const users = userData.put({
          id: allUsersData?.length + 1,
          name,
          role,
          salary,
        });
        users.onsuccess = () => {
          transaction.oncomplete = () => {
            db.close();
          };
          alert('Employee added');
        };
        users.onerror = (event) => {
          console.log(event);
          alert('Error occured');
        };
      };
    }
  };
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
        setAllUsersData(query.srcElement.result);
      };
      users.onerror = (query) => {
        alert('Error while loading');
      };
    };
  };
  return (
    <div className='App'>
      <InputTextField
        value={name}
        label='Add Name'
        onchangeValue={onChangeName}
      />
      <InputTextField
        value={role}
        label='Add role'
        onchangeValue={onChangeRole}
      />
      <InputTextField
        value={salary}
        label='Add salary'
        onchangeValue={onChangeSalary}
      />
      <Button onClickButton={onSubmit} label='submit' />

      <table className='App__table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {allUsersData?.map((user) => {
            return (
              <tr key={user?.id}>
                <td>{user?.name}</td>
                <td>{user?.role}</td>
                <td>{user?.salary}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
