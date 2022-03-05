import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';


const Permissions = (s) => {
    let navigate = useNavigate();
    const [input, setInput] = useState({})

    const handleButton = async (e) => {
        await s.state.contract.methods
            .addPRCEmployee(input.address)
            .send({ from: s.state.accounts[0] });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        let obj = input;
        setInput({ ...obj, [name]: value })
    }
    return (
        <div class="Form">
            <div class="bg" />
            <div class="form-request">
                <h1>Grant Access</h1>
                <span>address</span>
                <input
                    type="text"
                    name="address"
                    value={input.address}
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
export default Permissions;
