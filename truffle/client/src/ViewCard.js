import React, { useEffect, useState } from "react";
import CryptoJS from 'crypto-js';
import { create } from 'ipfs-http-client';


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
        card.cpdUnits = {};

        try {
            var encrypted = CryptoJS.AES.encrypt(JSON.stringify(card), 'secret key 123').toString();

            const ipfsresult = await ipfs.add(JSON.stringify(encrypted));
            await s.state.contract.methods
                .createCard(s.state.accounts[0], ipfsresult.path)
                .send({ from: s.state.accounts[0] });
            await s.state.contract.methods
                .addPRCProfessional(s.result.address)
                .send({ from: s.state.accounts[0] });
            alert("Card Request Approved!")

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
            {/* <h1>Card Information</h1>
                <h3>01</h3>
                <span>Registration No.</span>
                <h3>02/06/22</h3>
                <span>Registration Date</span>
                <h3>02/05/25</h3>
                <span>Valid Until</span> */}
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
