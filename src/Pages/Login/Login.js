import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import './Login.css'
import { fetchApi } from '../../Services/services'
const defaultForm = {
    "password": "",
    "userName": ""
}
const Login = () => {
    let history = useHistory();
    const [formData, setFormData] = useState(defaultForm)
    const [message, setMessage] = useState('')
    const changeHandler = (e) => {
        const { name, value } = e.target
        let updatedData = { ...formData, [name]: value }
        setFormData(updatedData)

    }
    const submitHandler = (e) => {
        e.preventDefault();
        setMessage('')
        fetchApi('auth/login', 'POST', formData, serviceReturn)

    }
    const serviceReturn = (data) => {
        console.log(JSON.stringify(data))
        if (data.status === 'SUCCESS') {
            if (data.data.message && data.data.message.includes("User already reg")) {
                setMessage(data.data.message)
            } else if (data.data.message && data.data.message.includes("Invalid") ){
                setMessage(data.data.message)
            }else {
                history.push('/booking')
            }
        } else {
            alert('ERROR OCCURRED')
        }


    }
    return (
        <div className="container">
            <div className="form_center">
                <h1>Login</h1>
                {message && <div className="alert alert-danger alert-dismissible fade show">
                    <strong>Error!</strong> {message}
                </div>}
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label htmlFor="text">Username:</label>
                        <input type="text" className="form-control" name="userName" placeholder="Enter Username" id="text" onChange={changeHandler} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd">Password:</label>
                        <input type="password" className="form-control" name="password" placeholder="Enter password" onChange={changeHandler} id="pwd" required />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <hr></hr>
                    <h5>Don't have account ? <Link to="/register">Register</Link></h5>
                </form>
            </div>
        </div>
    )
}

export default Login