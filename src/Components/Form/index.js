import React, { useState } from 'react';
import SelectBox from '../SelectBox/index'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './style.css'
import { VEHICLE_TYPES, CAR_TYPES, SERVICES_TYPES } from '../../Constants.js'

const FORM_DATA = {
    vehicleType: '',
    serviceType: '',
    carType: ''
}
const Form = () => {
    const [formData, setFormData] = useState(FORM_DATA);
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const formHandler = e => {
        const { name, value } = e.target
        let updatedData = { ...formData, [name]: value }
        setFormData(updatedData)
    }
    const submitHandler = (event) => {
        event.preventDefault()
        console.log(formData)
        console.log(startDate)
        console.log(startTime)
    }
    return (
        <form className="form" role="form" onSubmit={submitHandler} autoComplete="off">
            <SelectBox id="vehicleType"
                name="vehicleType"
                options={VEHICLE_TYPES}
                changeHandler={formHandler}
                label="Select Your Vehicle Type" />
            <SelectBox id="carType"
                name="carType"
                options={CAR_TYPES}
                changeHandler={formHandler}
                label="Select Your Car Type" />
            <SelectBox id="serviceType"
                name="serviceType"
                options={SERVICES_TYPES}
                changeHandler={formHandler}
                label="Select Service Type" />
            <div className="form-group d-flex">
                <div>
                    <label htmlFor="Select Date" className="d-block">Select Date</label>
                    <DatePicker selected={startDate} className="form-control  w-100" onChange={date => setStartDate(date)} />
                </div>
                <div className="ml-3">
                    <label htmlFor="Select Time" className="d-block">Select Time</label>
                    <DatePicker
                        className="form-control w-100"
                        selected={startTime}
                        onChange={date => setStartTime(date)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                    />
                </div>


            </div>
            <div className="form-group d-flex">
                <button type="submit" className="btn btn-default btn-lg btn-block text-center text-uppercase text-white bg-yellow">Book Now</button>
            </div>

        </form>
    )
}

export default Form