import React from "react";
import "./register.css";
import { useState } from "react";
import { FaOpencart } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

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
        <FaOpencart size={150} color="#fff" />
        <div className="register_formBox">
          <form onSubmit={registerUser}>
            <div className="register_formBox-group">
              <div className="register_formBox_inputContainers">
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
              <input
                type="password"
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <button className="btn">SIGN UP</button>
          </form>
          <h4>Already registered? <Link to="/login">Login</Link></h4>
        </div>
      </div>
    </>
  );
};

export default Register;
