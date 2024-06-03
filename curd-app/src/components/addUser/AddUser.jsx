import React from "react";
import "./addUser.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { RxPerson } from "react-icons/rx";
import { BsTelephone } from "react-icons/bs";
import { TfiEmail } from "react-icons/tfi";import Navbar from "../navbar/Navbar";
;
// import { MdLock } from "react-icons/md";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate()

  const createUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:1337/api/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          email,
        }),
      });
      if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        
        const data = await response.json();
        console.log(data);
        navigate("/curdApp")
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  return (
    <>
    <Navbar/>
      <div className="addUser">
        <h1>ADD USER</h1>
        <div className="addUser_formBox">
          <form onSubmit={createUser}>
            <div className="addUser_formBox-group">
              <div className="addUser_formBox_inputContainers marginR">
              <RxPerson color="#0057FC" icon="user" className="icon" />
                <input
                  type="text"
                  placeholder="FIRST NAME"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </div>
              <div className="addUser_formBox_inputContainers">
              <RxPerson color="#0057FC" icon="user" className="icon" />
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

            <div className="addUser_formBox_inputContainers">
            <TfiEmail color="#0057FC" icon="envelope" className="icon" />
              <input
                type="email"
                placeholder="EMAIL"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="addUser_formBox_inputContainers">
            <BsTelephone color="#0057FC" icon="phone" className="icon" />
              <input
                type="number"
                placeholder="PHONE"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </div>

            <button className="btn">SAVE</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
