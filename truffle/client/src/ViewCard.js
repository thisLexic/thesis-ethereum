import React, { useEffect, useState } from "react";
import { create } from 'ipfs-http-client';
import axios from "axios"

const ViewCard = (s) => {
    const ipfs = create({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })
    const handleButton = async (e) => {
        let events = await s.state.contract.getPastEvents("CreateCardEvent", { fromBlock: 0 })
        let card = s.result
        let regDate = new Date();
        let expDate = new Date();
        expDate.setFullYear(expDate.getFullYear() + 3)
        expDate.setDate(expDate.getDate() - 1)
        card.id = events.length + 1
        card.regDate = regDate.valueOf();
        card.expDate = expDate.valueOf();
        card.cpdUnits = [];
        card.archivedUnits = [];

        try {
            await axios.post('https://uid-server.herokuapp.com/encrypt', card).then(
                async res => {
                    await s.state.contract.methods
                        .createCard(s.result.address, events.length + 1, res.data)
                        .send({ from: s.state.accounts[0] });
                    await s.state.contract.methods
                        .addPRCProfessional(s.result.address)
                        .send({ from: s.state.accounts[0] });
                    alert("Card Request Approved!")
                })
        } catch (err) {
            alert(err)
        }


    }
    return (
        <div className="profile">
            <h1>Request Information</h1>
            <h3>{s.result.lastName}</h3>
            <span>Last Name</span>
            <h3>{s.result.firstName}</h3>
            <span>First Name</span>
            <h3>{s.result.middleName}</h3>
            <span>Middle Name</span>
            <h3>{s.result.profession}</h3>
            <span>Profession</span>
            <h3>{s.result.sex}</h3>
            <span>Sex</span>
            <h3>{s.result.birthDate}</h3>
            <span>Birth Date</span>
            <div className="buttons">
                <button type="button" onClick={e => handleButton(e)}>
                    APPROVE
                </button>
                <button type="button" onClick={e => handleButton(e)}>
                    DECLINE
                </button>
            </div>


        </div>
    )
}

export default ViewCard;
