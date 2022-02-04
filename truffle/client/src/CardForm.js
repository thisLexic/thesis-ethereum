import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';


const CardForm = (s) => {
    let history = useHistory();
    const [input, setInput] = useState({
        user: '',
        password: ''
    })

    const handleButton = async (e) => {
        history.push("/main");
      }

    const handleChange = (e) => {
        const { name, value } = e.target;
        let obj = input;
        setInput({ ...obj, [name]: value })
    }
    return (
        <div class="Form">
        <div class="bg" />
        <div class="form-request card">
        <h1>Apply for a Card</h1>
        <span>Personal Information</span>
            <span>First Name</span>
            <input
                type="text"
                name="firstName"
                value={input.firstName}
                onChange={e => handleChange(e)}
            />
            <span>Middle Name</span>
            <input
                type="text"
                name="middleName"
                value={input.middleName}
                onChange={e => handleChange(e)}
            />
            <span>Last Name</span>
            <input
                type="text"
                name="lastName"
                value={input.lastName}
                onChange={e => handleChange(e)}
            />
            <span>Sex</span>
            <select name="sex" value={input.sex}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            </select>
            <span>Birth Date</span>
            <input
                type="date"
                name="birthDate"
                value={input.birthDate}
                onChange={e => handleChange(e)}
            />
            <span>Profession</span>
            <input
                type="text"
                name="profession"
                value={input.profession}
                onChange={e => handleChange(e)}
            />
            <button
              onClick={e => handleButton(e)}>
              SUBMIT
            </button>
        </div>
            
        </div>
    );
}
export default CardForm;
