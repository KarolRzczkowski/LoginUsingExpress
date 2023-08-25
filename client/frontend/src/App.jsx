import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [backenddata1, setBackenddata1] = useState([]);
  const [backenddata2, setBackenddata2] = useState([]);
  const [backenddata3, setBackenddata3] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    const fetchDataFromBackend1 = async () => {
      try {
        const res = await axios.get('/books');
        setBackenddata1(res.data.books);
      } catch (error) {
        console.log('Error fetching data from backend 1', error);
      }
    };
    fetchDataFromBackend1();
  }, []);

  useEffect(() => {
    const fetchDataFromBackend2 = async () => {
      try {
        const res = await axios.get('/lectures');
        setBackenddata2(res.data);
      } catch (error) {
        console.log('Error fetching data from backend 2', error);
      }
    };
    fetchDataFromBackend2();
  }, []);

  useEffect(() => {
    const fetchDataFromBackend3 = async () => {
      try {
        const res = await axios.get('/shoes');
        setBackenddata3(res.data);
      } catch (error) {
        console.log('Error fetching data from backend 3', error);
      }
    };
    fetchDataFromBackend3();
  }, []);

  const handleDeleteShoe = async (id) => {
    try {
      await axios.delete(`/shoes/${id}`);
      const res = await axios.get('/shoes');
      setBackenddata3(res.data);
    } catch (error) {
      console.log('Error deleting shoe', error);
    }
  };

  const handleAddUser = async () => {
    try {
      await axios.post('/emails', { email });
      setEmail("");
    } catch (error) {
      console.log('Error adding user', error);
    }
  };

  const handleAddPassword = async () => {
    try {
      await axios.post('/passwords', { password });
      setPassword("");
      setPasswordError(false); // Reset the password error state
    } catch (error) {
      console.log('Error getting password', error);
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (newPassword.length < 10) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  return (
    <div>
      <div>
        {backenddata1.length === 0 ? (
          <p>Loading back1...</p>
        ) : (
          backenddata1.map((item, index) => (
            <p key={index}>
              Name: {item.name}, ID: {item._id}, Is Logged: {item.islogged ? 'Logged in' : 'Not logged in'}
            </p>
          ))
        )}
      </div>
      <div>
        {backenddata2.length === 0 ? (
          <p>Loading back2...</p>
        ) : (
          backenddata2.map((item, index) => (
            <p key={index}>
              Name: {item.name}, ID: {item._id}, Is Logged: {item.islogged ? 'Logged in' : 'Not logged in'}
            </p>
          ))
        )}
      </div>
      <div>
        {backenddata3.length === 0 ? (
          <p>Loading back3...</p>
        ) : (
          backenddata3.map((item, index) => (
            <div key={index}>
              <p>
                Type: {item.type}, ID: {item._id}, IsComfrotable: {item.isComfortable}
              </p>
              <button onClick={() => handleDeleteShoe(item._id)}>Delete shoe</button>
            </div>
          ))
        )}
      </div>
      <div>
        <h2>Add user to database</h2>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter Your Email'
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>
      <div>
        <h2>Add password to account</h2>
        <input
          type='password'
          value={password}
          onChange={handlePasswordChange}
          placeholder='Enter your password'
        />
        {passwordError && <p>Password must be at least 10 characters long.</p>}
        <button onClick={handleAddPassword}>Add Password</button>
      </div>
    </div>
  );
}

export default App;
