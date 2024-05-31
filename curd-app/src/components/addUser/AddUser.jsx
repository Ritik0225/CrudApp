import React from "react";
import "./addUser.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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
      <div className="addUser">
        <h1>Add User</h1>
        <div className="addUser_formBox">
          <form onSubmit={createUser}>
            <div className="addUser_formBox-group">
              <div className="addUser_formBox_inputContainers">
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
