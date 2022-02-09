import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { create } from 'ipfs-http-client';
import CryptoJS from 'crypto-js';

const CardForm = (s) => {

    const [state, setState] = useState({});
    const [card, setCard] = useState({ cpdUnits: {} });
    useEffect(() => {
        setState(s.state);
    }, [s.state])

    const ipfs = create({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        var encrypted = CryptoJS.AES.encrypt(JSON.stringify(card), 'secret key 123').toString();
        
        const ipfsresult = await ipfs.add(JSON.stringify(encrypted))
        
        await state.contract.methods
        .requestCard(state.accounts[0], ipfsresult.path )
        .send({ from: state.accounts[0] });

        var bytes = CryptoJS.AES.decrypt(encrypted, 'secret key 123');
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        console.log(originalText);
        navigate("/main");
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCard({ ...card, [name]: value })
    }
    return (
        <div class="Form">
            <div class="bg" />
            <div class="form-request card">
                <h1>Apply for a Card</h1>
                <span>First Name</span>
                <input
                    type="text"
                    name="firstName"
                    value={card.firstName}
                    onChange={e => handleChange(e)}
                />
                <span>Middle Name</span>
                <input
                    type="text"
                    name="middleName"
                    value={card.middleName}
                    onChange={e => handleChange(e)}
                />
                <span>Last Name</span>
                <input
                    type="text"
                    name="lastName"
                    value={card.lastName}
                    onChange={e => handleChange(e)}
                />
                <span>Sex</span>
                <select name="sex"
                    value={card.sex}
                    onChange={e => handleChange(e)}>
                    <option >Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <span>Birth Date</span>
                <input
                    type="date"
                    name="birthDate"
                    value={card.birthDate}
                    onChange={e => handleChange(e)}
                />
                <span>Profession</span>
                <input
                    type="text"
                    name="profession"
                    value={card.profession}
                    onChange={e => handleChange(e)}
                />
                <button
                    onClick={e => handleSubmit(e)}>
                    SUBMIT
            </button>
            </div>

        </div>
    );
}
export default CardForm;
