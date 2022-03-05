import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios"

const CardForm = (s) => {
    const [card, setCard] = useState({});

    let navigate = useNavigate();

    const handleSubmit = async (e) => {

        try {
            await axios.post('https://uid-server.karlocabugwang1.repl.co/encrypt', card).then(
                async res => {
                    await s.state.contract.methods
                .requestCard(s.state.accounts[0], res.data)
                .send({ from: s.state.accounts[0] });
                alert("Submitted!")
                })
            
            
            
        } catch(err) {
            alert(err)

        }


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
