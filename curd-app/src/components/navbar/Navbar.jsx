import React from 'react'
import { BsPersonCircle } from "react-icons/bs";
import "./navbar.css"

const Navbar = () => {
  return (
    <>
    <div className='navbar'>
        <div className='navbar_left'>
          <h3>Dashboard</h3>
        </div>
        <div className='navbar_right'>
          <BsPersonCircle color='#0057FC'/>
        <p>Admin</p>
        </div>

    </div>
    </>
  )
}

export default Navbar
