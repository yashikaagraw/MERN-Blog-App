import React, { useEffect } from 'react';
import { useState } from 'react';
import { MyAuthContext } from '../Context/AuthContextProvider';
import { useContext } from 'react';

const Dashboard = () => {
  const [state, setState] = useState([]);
  const [filter, setFilter] = useState('');
  const { login, logout, isAuth } = useContext(MyAuthContext);

  const fetchdata = async () => {
    let url = 'https://jsonplaceholder.typicode.com/todos';
    if (filter === 'yes') {
      url += '?completed=true';
    }
    if (filter === 'no') {
      url += '?completed=false';
    }
    const response = await fetch(url);
    const data = await response.json();
    setState(data);
  };

  useEffect(() => {
    fetchdata();
  }, [filter]);

  const handlelogout = () => {
    logout();
  };
  
  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div>
      <h1 style={headingStyle}>Dashboard</h1>
      <button onClick={handlelogout} style={buttonStyle}>
        Log Out
      </button>
      <select onChange={(e) => setFilter(e.target.value)} style={selectStyle}>
        <option>Filtering</option>
        <option value="yes">Completed</option>
        <option value="no">Incompleted</option>
      </select>
      <div style={{ display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)', 
  gap: '16px'}}>
      {state?.map((e) => {
        return (
          <div key={e.id} style={todoItemStyle}>
            <h2>Title: {e.title}</h2>
            <h3>User ID: {e.userId}</h3>
            <h4>Completed: {e.completed ? 'YES' : 'NO'}</h4>
          </div>
        );
      })}
    </div>
    </div>
  );
};

// Define your CSS styles as JavaScript objects
const headingStyle = {
  color: 'blue',
  textAlign: 'center',
};

const buttonStyle = {
  backgroundColor: 'red',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  cursor: 'pointer',
};

const selectStyle = {
  padding: '5px',
  fontSize: '16px',
};

const todoItemStyle = {
  border: '1px solid #ccc',
  borderRadius: '5px',
  margin: '10px',
  padding: '10px',
 
};

export default Dashboard;
