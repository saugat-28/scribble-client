import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import icon from '../images/scribble-icon.png'

const Welcome = (props) => {

    const host = "https://scribble-kxoi.onrender.com"
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate()

    const loginUser = async (e) => {
        e.preventDefault();
        // API CALL
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        })
        const json = await response.json();
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authToken)
            if (document.getElementById("rememberMeSwitch").checked) {
                localStorage.setItem('remember', true);
                console.log("Remembered")
            } else {
                localStorage.setItem('remember', false);
                console.log("Not Remembered")
            }
            navigate("/home")
            props.showAlert("Logged in Successfuly!", "success")
        } else {
            props.showAlert("Invalid Credentials", "warning")
        }
    }

    const onInputChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='container'>
            <div className='d-flex'>
                <div id='welcome-left' className='text-center mt-5'>
                    <img src={icon} height={300} width={300} alt="Scribble-Icon" />
                    <h1><b>Scribble</b></h1>
                    <h3><b>A Secure Notebook on the Cloud</b></h3>
                    <h6><b>Remember everything and tackle any task with your notes kept all in one place.</b></h6>
                </div>
                <div id='welcome-center'></div>
                <div id='welcome-right' >
                    <div className='text-center'>
                        <h1 className='heading mt-5'><b>Sign In To Continue </b></h1>
                    </div>
                    <form onSubmit={loginUser} className='mt-4'>
                        <div className="mb-3">
                            <label htmlFor="userEmail" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="userEmail" aria-describedby="emailHelp" name="email" value={credentials.email} onChange={onInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userPassword" className="form-label">Password</label>
                            <input type="password" className="form-control" id="userPassword" name="password" value={credentials.password} onChange={onInputChange} />
                        </div>
                        <div>
                            <div className='text-start'>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch" id="rememberMeSwitch" />
                                    <label className="form-check-label" htmlFor="rememberMeSwitch">Remember Me</label>
                                </div>
                            </div>
                            <div className='text-end' >
                                <button type="submit" className="btn btn-primary" >Sign In</button>
                            </div>
                        </div>
                    </form>
                    <div className='text-center mt-3'>
                        <Link to="/signup"><b>Don't have an account? Sign Up Now!</b></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Welcome