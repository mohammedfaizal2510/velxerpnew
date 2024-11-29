import React, { useState } from 'react'
import {Button} from "react-bootstrap"
import "../css/LogIn.css"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const LogIn = () => {
    const navigate = useNavigate();
    const [una,setuna] = useState('');
    const [pass,setpass] = useState('');
    const log=()=>{
        axios.get(`${import.meta.env.VITE_SER}log`,{headers:{una,pass}}).then(r=>{
            console.log(r.data);
            if (r.data) {
                sessionStorage.setItem('auth',r.data._id)
                sessionStorage.setItem('admin',r.data.admin ?? '')
                navigate("/projects/dashboard")
            }else{
                // incorrect Username password
            }
        })
    }
  return (
    <>
        <div className="login-container">
            <div className="login-box">
            {/* <h2>Login</h2> */}
            <img src="https://res.cloudinary.com/dzysiltcv/image/upload/v1728896383/Velx-logo_targ2r.png" alt="" className='w-25 mb-5'/>
            <form action="#">
                <div className="input-box">
                    <input type="text" value={una} onChange={e=>setuna(e.target.value)} required/>
                    <label>Username</label>
                </div>
                <div className="input-box">
                    <input type="password" value={pass} onChange={e=>setpass(e.target.value)} required/>
                    <label>Password</label>
                </div>
                {/* <div className="remember-me">
                    <input type="checkbox" id="remember-me"/>
                    <label for="remember-me">Remember Me</label>
                </div> */}
                <Button variant="success" className='p-3 pl-4 pr-4 w-100' style={{borderRadius:"20px"}} onClick={log}>LogIn</Button>
                <Button variant="success" className='p-3 pl-4 pr-4 w-100 mt-4' style={{borderRadius:"20px"}}>Forgot Password</Button>
                {/* <button type="submit" className="login-btn mb-3">Login</button>
                <button type="submit" className="login-btn">Forgot Password</button> */}
                <div className="register">
                    <p>Don't have an account? <a href="./Reg">Register</a></p>
                </div> 
            </form>
        </div>
    </div>
    </>
  )
}

export default LogIn
