import React, { useEffect, useState } from "react";
import CryptoJS from 'crypto-js';

const Profile = (s) => {
    const [result, setResult] = useState({});
    useEffect(() => {
        let eventList = []
        async function getEvents() {

            let events = await s.state.contract.getPastEvents("CreateCardEvent",{ fromBlock: 0, filter: { _idNumber: s.state.accounts[0] } })
            console.log(events[-1])
            fetch(`https://ipfs.infura.io/ipfs/${events[0].returnValues._ipfsHash}`)
            .then((response) => response.json())
            .then((encrypted) => {
                var bytes = CryptoJS.AES.decrypt(encrypted, 'secret key 123');
                var originalText = bytes.toString(CryptoJS.enc.Utf8);
                setResult(JSON.parse(originalText))
            })
            // events.forEach(async e => {
            //     let t = {}
            //     t.blockNumber = e.blockNumber
            //     t.transactionHash = e.transactionHash
            //     let eventName = e.event.split(/(?=[A-Z])/)
            //     eventName.pop(-1)
            //     t.event = eventName.join(" ")
            //     t.ipfsHash = e.returnValues._ipfsHash
            //     t.date = new Date(e.returnValues._time * 1000).toLocaleDateString("en-US")
            //     eventList.push(t)
            // })
            // setTransactions(eventList.sort((a, b) => {
            //     return b.blockNumber - a.blockNumber;
            // }))
        }
        getEvents()
    }, [s.state])
    return (
        <div>
            <div className="profile">
                <h1>Personal Information</h1>
                <h3>{result.lastName}</h3>
                <span>Last Name</span>
                <h3>{result.firstName}</h3>
                <span>First Name</span>
                <h3>{result.middleName}</h3>
                <span>Middle Name</span>
                <h3>{result.profession}</h3>
                <span>Profession</span>
                <h3>{result.sex}</h3>
                <span>Sex</span>
                <h3>{result.birthDate}</h3>
                <span>Birth Date</span>
                <h1>Card Information</h1>
                <h3>{result.id}</h3>
                <span>Registration No.</span>
                <h3>{result.regDate && new Date(result.regDate ).toLocaleDateString("en-US")}</h3>
                <span>Registration Date</span>
                <h3>{result.regDate && new Date(result.expDate).toLocaleDateString("en-US")}</h3>
                <span>Valid Until</span>

            </div>
        </div>
    );

}
export default Profile;

