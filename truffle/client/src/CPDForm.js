import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';


const CPDForm = (s) => {
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
            <div class="form-request cpd">
                <h1>Submit CPD Units</h1>
                <span>Units</span>
                <input
                    type="text"
                    name="units"
                    value={input.units}
                    onChange={e => handleChange(e)}
                />
                <span>Institution</span>
                <input
                    type="text"
                    name="institution"
                    value={input.institution}
                    onChange={e => handleChange(e)}
                />
                <span>Date of Completion</span>
                <input
                    type="date"
                    name="completionDate"
                    value={input.completionDate}
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
export default CPDForm;
