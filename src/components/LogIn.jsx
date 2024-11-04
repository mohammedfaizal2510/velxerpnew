import React from 'react'
import {Button} from "react-bootstrap"
import "../css/LogIn.css"


const LogIn = () => {
    // const navigate = useNavigate();
  return (
    <>
        <div className="login-container">
            <div className="login-box">
            {/* <h2>Login</h2> */}
            <img src="https://res.cloudinary.com/dzysiltcv/image/upload/v1728896383/Velx-logo_targ2r.png" alt="" className='w-25 mb-5'/>
            <form action="#">
                <div className="input-box">
                    <input type="text" required/>
                    <label>Username</label>
                </div>
                <div className="input-box">
                    <input type="password" required/>
                    <label>Password</label>
                </div>
                {/* <div className="remember-me">
                    <input type="checkbox" id="remember-me"/>
                    <label for="remember-me">Remember Me</label>
                </div> */}
                <Button variant="success" className='p-3 pl-4 pr-4 w-100' style={{borderRadius:"20px"}}>LogIn</Button>
                <Button variant="success" className='p-3 pl-4 pr-4 w-100 mt-4' style={{borderRadius:"20px"}}>Forgot Password</Button>
                {/* <button type="submit" className="login-btn mb-3">Login</button>
                <button type="submit" className="login-btn">Forgot Password</button> */}
                {/* <div className="register">
                    <p>Don't have an account? <a href="#">Register</a></p>
                </div> */}
            </form>
        </div>
    </div>
    </>
  )
}

export default LogIn
