import React, { useEffect, useState } from 'react';
import './curdTable.css';
import { Link } from 'react-router-dom';
import { RiPencilFill } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import { ImBin2 } from "react-icons/im";

const CurdTable = () => {
 
const [users, setUsers] = useState([])
const [error, setError] = useState(null)

  useEffect(()=>{
    fetch('http://localhost:1337/user')
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setUsers(data))
      .catch(err => setError(err.message));
  }, []);
  

  const handleDelete = (id) => {
    fetch('http://localhost:1337/deleteUser/'+id, {
      method: 'DELETE',
    })
      .then(response => {

        console.log(response)
        window.location.reload()
      })
      .catch(err => console.log(err))
  
  }

  return (
    <div className="table-container">
      <Link to={'/addUser'}><button className="add-user-btn">+ ADD NEW USER</button></Link> 
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Phone</th>
            <th>E-Mail</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName + user.lastName}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>{user.date}</td>
              <td>
                <button className="action-btn view-btn"><IoSearchOutline/></button>
                <Link to={`/editUser/${user._id}`}><button className="action-btn edit-btn"><RiPencilFill /></button></Link>
                <button className="action-btn delete-btn" onClick={(e) => handleDelete(user._id)}><ImBin2/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button>‹</button>
        <button className="page-btn active">1</button>
        <button className="page-btn">2</button>
        <button className="page-btn">3</button>
        <button className="page-btn">4</button>
        <button>›</button>
        <select className="per-page-select">
          <option value="10">10 /Page</option>
        </select>
      </div>
    </div>
  );
}

export default CurdTable;