import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SelectBox from '../SelectBox/index'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './style.css'
import { fetchApi, URL, bearer } from '../../Services/services'
import { CAR_TYPES, SERVICES_TYPES } from '../../Constants.js'

const FORM_DATA = {
    vehicleType: '',
    serviceType: '',
    vehicleSubType: ''
}
const Form = () => {
    const [formData, setFormData] = useState(FORM_DATA);
    const [loader, setLoader] = useState(false);
    const [VEHICLE_LIST, setVEHICLE_LIST] = useState([]);
    const [VEHICLE_TYPES, setVEHICLE_TYPES] = useState([]);
    const [SERVICE_TYPES, setSERVICE_TYPES] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const formHandler = e => {
        const { name, value } = e.target
        let updatedData = { ...formData, [name]: value }

        setFormData(updatedData)
        if (name === 'vehicleType' && value) {
            console.log("carType")
            fetchVehicleType(value)
        }
        if (name === 'vehicleSubType' && value) {
            fetchServiceList(value)
        }
    }
    useEffect(() => {
        if (VEHICLE_LIST.length === 0) {
            fetchAllVehicles()
        }

    }, [])

    const fetchAllVehicles = () => {
        setLoader(true)
        fetchApi('vehicle/getAllVehicle', 'GET', null, allVehicleReturn)
    }
    const fetchVehicleType = (value) => {
        setLoader(true)
        fetchApi(`vehicle/getVehicleType/${value}`, 'GET', null, allVehicleTypeReturn)
    }
    const fetchServiceList = (value) => {
        setLoader(true)
        console.log("FORM_DATA", formData)
        fetchApi(`booking/getPackageList/${formData.vehicleType}/${value}`, 'GET', null, serviceTypeReturn)
    }

    const allVehicleReturn = (data) => {
        setLoader(false)
        if (data.status === 'SUCCESS') {
            let list = data.data.map(item => {
                return { "label": item, "value": item }
            })
            list.unshift({ "label": 'Select', "value": '' })
            setVEHICLE_LIST(list)
        }
    }
    const allVehicleTypeReturn = (data) => {
        console.log(JSON.stringify('allVehicleTypeReturn', data))
        setLoader(false)
        if (data.status === 'SUCCESS') {
            let list = data.data.map(item => {
                return { "label": item, "value": item }
            })
            list.unshift({ "label": 'Select', "value": '' })
            setVEHICLE_TYPES(list)
        }
    }
    const serviceTypeReturn = (data) => {
        console.log(JSON.stringify('allVehicleTypeReturn', data))
        setLoader(false)
        if (data.status === 'SUCCESS') {
            let list = data.data.map(item => {
                return { "label": item, "value": item }
            })
            list.unshift({ "label": 'Select', "value": '' })
            setSERVICE_TYPES(list)
        }
    }
    const submitHandler = (event) => {
        event.preventDefault()
        console.log(formData)
        console.log(startDate)
        console.log(startTime)
    }
    console.log(JSON.stringify(VEHICLE_LIST))
    return (
        <>
            {loader && <div class="loading">Loading&#8230;</div>}
            <form className="form" role="form" onSubmit={submitHandler} autoComplete="off" >
                {VEHICLE_LIST.length > 0 && <SelectBox id="vehicleType"
                    name="vehicleType"
                    options={VEHICLE_LIST}
                    changeHandler={formHandler}
                    label="Select Your Vehicle Type" />}
                {VEHICLE_TYPES.length > 0 && <SelectBox id="vehicleSubType"
                    name="vehicleSubType"
                    options={VEHICLE_TYPES}
                    changeHandler={formHandler}
                    label="Select Your Car Type" />}
                {FORM_DATA.vehicleSubType && <div className="form-group">
                    <label htmlFor="location">Available Location</label>
                    <input className="form-control" value="Wakad, Pune" name="location" disabled />
                </div>}
                {SERVICE_TYPES.length > 0 && <SelectBox id="serviceType"
                    name="serviceType"
                    options={SERVICE_TYPES}
                    changeHandler={formHandler}
                    label="Select Service Type" />}
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
        </>
    )
}

export default Form