import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = (props) => {
    const host = "http://localhost:5000"
    const [user, setUser] = useState({ name: "", email: "", password: "", cpassword: "" })
    let navigate = useNavigate()


    const loginUser = async (e) => {
        e.preventDefault();
        const { name, email, password, cpassword } = user
        if (password === cpassword) {
            // API CALL
            const response = await fetch(`${host}/api/auth/createuser`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password })
            })
            const json = await response.json();
            console.log(json)
            if (json.success) {
                // Save the auth token and redirect
                localStorage.setItem('token', json.authToken)
                navigate("/")
                props.showAlert("Account Created Successfully", "success")
            } else {
                props.showAlert("Sign Up failed due to some error! Please try again later", "warning")
            }
        } else {
            props.showAlert("Password and Confirm Password Must Be Same", "warning")
        }

    }

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    return (
        <div className='container'>
            <form onSubmit={loginUser}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onInputChange} value={user.name} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onInputChange} value={user.email} required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onInputChange} value={user.password} required minLength={5} />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="confirmPassword" name="cpassword" onChange={onInputChange} value={user.cpassword} required minLength={5} />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp