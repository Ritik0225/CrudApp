import React, { useState } from "react";
import { LiaCartArrowDownSolid } from "react-icons/lia";
import { useNavigate, Link } from "react-router-dom";
import { RxPerson } from "react-icons/rx";
import { BsTelephone } from "react-icons/bs";
import { TfiEmail } from "react-icons/tfi";
import { SlLock } from "react-icons/sl";
import "./register.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const registerUser = async(e) => {
    e.preventDefault()

    const response = await fetch('http://localhost:1337/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone,
        password
      })
    })
    const data = await response.json()
    console.log(data)

    if(response.ok){
      navigate("/curdApp")
    }
  }

  return (
    <>
      <div className="register">
        <LiaCartArrowDownSolid size={150} className="main-icon" color="#fff" />
        <div className="register_formBox">
          <form onSubmit={registerUser}>
            <div className="register_formBox-group">
              <div className="register_formBox_inputContainers marginR">
              <RxPerson color="#fff" icon="user" className="icon" />
                <input
                  type="text"
                  placeholder="FIRST NAME"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </div>
              <div className="register_formBox_inputContainers">
              <RxPerson color="#fff" icon="user" className="icon" />
                <input
                  type="text"
                  placeholder="LAST NAME"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="register_formBox_inputContainers">
            <TfiEmail color="#fff" icon="envelope" className="icon" />
              <input
                type="email"
                placeholder="EMAIL"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="register_formBox_inputContainers">
            <BsTelephone color="#fff" icon="phone" className="icon" />
              <input
                type="number"
                placeholder="PHONE"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </div>
            <div className="register_formBox_inputContainers">
            <SlLock color="#ffff" icon="phone" className="icon" />
              <input
                type="password"
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <button className="btn-signup">SIGN UP</button>
          </form>
          <h4>Already registered? <Link to="/login">Login</Link></h4>
        </div>
      </div>
    </>
  );
};

export default Register;
