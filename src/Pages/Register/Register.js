import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { fetchApi } from '../../Services/services'
import './Register.css'
const defaultForm =
{
    "firstName": "",
    "mobileNum": "",
    "gId": null,
    "fId": null,
    "email": "",
    "userType": "USER",
    "password": ""
}
const Register = () => {
    let history = useHistory();
    const [formData, setFormData] = useState(defaultForm)
    const [message, setMessage] = useState('')
    const changeHandler = (e) => {
        const { name, value } = e.target
        let updatedData = { ...formData, [name]: value }
        setFormData(updatedData)

        console.log(updatedData)
    }
    const submitHandler = (e) => {
        e.preventDefault();
        setMessage('')
        fetchApi('auth/register', 'POST', formData, serviceReturn)
    }

    const serviceReturn = (data) => {
        console.log(JSON.stringify(data))
        if (data.status === 'SUCCESS') {
            if (data.data.message && data.data.message.includes("User already reg")) {
                setMessage(data.data.message)
            } else {
                history.push('/booking')
            }
        } else {
            alert('ERROR OCCURRED')
        }


    }
    return (
        <div className="container">
            <div className="form_center">
                <h1>Register</h1>
                {message && <div className="alert alert-danger alert-dismissible fade show">
                    <strong>Error!</strong> {message}
                </div>}
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" className="form-control" name="firstName" placeholder="Enter first name" id="firstName" onChange={changeHandler} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" className="form-control" name="lastName" placeholder="Enter last name" id="lastName" onChange={changeHandler} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address:</label>
                        <input type="email" className="form-control" name="userName" placeholder="Enter email" id="email" onChange={changeHandler} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobileNum">Phone number:</label>
                        <input type="text" className="form-control" pattern="[789][0-9]{9}" name="mobileNum" placeholder="Enter email" id="mobileNum" onChange={changeHandler} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" className="form-control" name="password" placeholder="Enter password" id="pwd" onChange={changeHandler} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <hr></hr>
                    <h5>Already have account ? <Link to="/">Login</Link></h5>
                </form>
            </div>
        </div>
    )
}

export default Register