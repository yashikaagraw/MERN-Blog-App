import React from 'react'
import {useState, useEffect} from 'react'

const Admin = () => {
    const [state, setState] = useState([]);
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useState(false);
    const [selectedDetails, setSelectedDetails] = useState(null);
  
    console.log(state);
  
    let url = `http://localhost:8000/admincontact`;
  
    const DisplayPaint = async () => {
      const res = await fetch(url);
      const data = await res.json();
      setState(data);
      console.log(data.data);
    };
  
    useEffect(() => {
      DisplayPaint();
    }, []);
  
    const handleSubmit = (e) => {
      if (id === "admin" && password === "admin123") {
        setAuth(true);
        alert("Login successful");
      }
    };
  
    const handleNameClick = (details) => {
      setSelectedDetails(details === selectedDetails ? null : details);
    };
  
    if (auth) {
      return (
        <div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {state?.map((e) => (
              <div key={e}>
                <h1 onClick={() => handleNameClick(e)}>{`Name: ${e.name}`}</h1>
                {selectedDetails === e && (
                  <div>
                    <p>Email: {e.email}</p>

                    <p>Message: {e.message}</p>
                    <p>Time: {e.createdAt}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }
    return (
      <div>
        <h1>Admin login</h1>
  
        <input
          placeholder="id"
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
  
        <input
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
  
        <button onClick={handleSubmit}>Submit</button>
      </div>
    );
  };
  
  export default Admin;
  