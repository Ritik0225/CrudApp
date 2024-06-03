import React from 'react'
import './login.css'
import { LiaCartArrowDownSolid } from "react-icons/lia";
import { TfiEmail } from "react-icons/tfi";
import { SlLock } from "react-icons/sl";
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const loginUser = async(e) => {
        e.preventDefault()

        const response = await fetch("http://localhost:1337/api/login", {
            method: "POST",
            headers: {
            'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        const data = await response.json()

        console.log(data)

        if(data.user){
            alert("Login successful")
            
            navigate("/curdApp")
        }else{
            alert("Invalid credentials - Please check the email or password")
        }
        
    }

  return (
    <>
        <div className='login'>
        <LiaCartArrowDownSolid size={150} color="#fff"/>
            <div className='login_formBox'>
                <form onSubmit={loginUser}>
                    <div className='login_formBox_inputContainers'>
                    <TfiEmail color="#fff" icon="envelope" className="icon" />
                        <input 
                        type='email' 
                        placeholder='EMAIL'
                        value={email}
                        onChange={(e) => {setEmail(e.target.value)}}/>
                    </div>
                    <div className='login_formBox_inputContainers'>
                    <SlLock color="#fff" icon="envelope" className="icon" />
                        <input 
                        type='password' 
                        placeholder='PASSWORD'
                        value={password}
                        onChange={(e) => {setPassword(e.target.value)}}/>
                    </div>
                    <button className='login-btn'>LOGIN</button>
                </form>
                <h4>Not registered Yet? <Link to="/register">Sign up</Link></h4>
            </div>
        </div>
    </>
  )
}

export default Login
