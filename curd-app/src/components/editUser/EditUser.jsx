import React, { useEffect, useState } from 'react';
import './editUser.css';
import { useParams, useNavigate } from 'react-router-dom';

const EditUser = () => {
  const { id } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:1337/getUser/${id}`)
      .then(response => response.json())
      .then(data => {
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
        setPhone(data.phone);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { 
      firstName, 
      lastName, 
      email, 
      phone 
    };

    fetch(`http://localhost:1337/updateUser/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'ok') {
          navigate('/curdApp');
        } else {
          console.log('Error updating user');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="addUser">
      <h1>Update User</h1>
      <div className="addUser_formBox">
        <form onSubmit={handleSubmit}>
          <div className="addUser_formBox-group">
            <div className="addUser_formBox_inputContainers">
              <input
                type="text"
                placeholder="FIRST NAME"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="addUser_formBox_inputContainers">
              <input
                type="text"
                placeholder="LAST NAME"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="addUser_formBox_inputContainers">
            <input
              type="email"
              placeholder="EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="addUser_formBox_inputContainers">
            <input
              type="number"
              placeholder="PHONE"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <button className="btn" type="submit">UPDATE</button>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
