import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';


const Permissions = (s) => {
    let navigate = useNavigate();
    const [input, setInput] = useState({})
    const [state, setState] = useState({});
    useEffect(() => {
        setState(s.state);
    }, [s])

    const handleButton = async (e) => {
        await state.contract.methods
            .addPRCProfessional(input.address)
            .send({ from: "0xF43d5012E79E163f621582ddBd77708C7dd81ecc" });
        navigate("/main");
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
