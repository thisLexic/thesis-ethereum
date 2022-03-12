import React, { useEffect, useState } from "react";
import { create } from 'ipfs-http-client';
import axios from "axios"


const ViewRenew = (s) => {
    const ipfs = create({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })
    const handleButton = async (e) => {
        let card = s.result
        let oldExpDate = new Date(card.expDate)
        let regDate = oldExpDate.setDate(oldExpDate.getDate() + 1)
        let expDate = new Date(regDate);
        expDate.setFullYear(expDate.getFullYear() + 3)
        expDate.setDate(expDate.getDate() - 1)
        card.regDate = regDate.valueOf();
        card.expDate = expDate.valueOf();
        let archivedUnits = card.archivedUnits ? card.archivedUnits : [];
        archivedUnits.push(card.cpdUnits);
        card.archivedUnits = archivedUnits;
        card.cpdUnits = [];

        try {
            await axios.post('https://uid-server.herokuapp.com/encrypt', card).then(
                async res => {
                    await s.state.contract.methods
                        .renewCard(card.address, card.id, res.data)
                        .send({ from: s.state.accounts[0] });
                    alert("Card Request Approved!")
                })

        } catch (err) {
            alert(err)
        }
    }
    return (
        <div className="profile">
            <span>Name: {s.result.firstName} {s.result.middleName ? `${s.result.middleName.charAt(0)}.` : " "} {s.result.lastName}</span>
            <span>Registration No: {s.result.id}</span>
            <h1>Request Information</h1>
            <h3>{s.totalUnits}</h3>
            <span>Units Completed</span>

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

export default ViewRenew;
