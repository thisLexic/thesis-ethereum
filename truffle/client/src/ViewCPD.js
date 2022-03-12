import React, { useEffect, useState } from "react";
import { create } from 'ipfs-http-client';
import axios from "axios"


const ViewCPD = (s) => {
    const ipfs = create({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })
    const handleButton = async (e) => {
        let card = s.result
        card.cpdUnits[card.cpdUnits.length - 1].isApproved = true
        console.log(card)


        try {
            await axios.post('https://uid-server.herokuapp.com/encrypt', card).then(
                async res => {
                    await s.state.contract.methods
                        .editCard(s.result.address, s.result.id, res.data)
                        .send({ from: s.state.accounts[0] });
                    alert("CPD Request Approved!")
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
            <h3>{s.result.cpdUnits && s.result.cpdUnits[s.result.cpdUnits.length - 1].units}</h3>
            <span>Units</span>
            <h3>{s.result.cpdUnits && s.result.cpdUnits[s.result.cpdUnits.length - 1].institution}</h3>
            <span>Institution</span>
            <h3>{s.result.cpdUnits && s.result.cpdUnits[s.result.cpdUnits.length - 1].completionDate}</h3>
            <span>Completion Date</span>

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

export default ViewCPD;
