import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = (s) => {
    const [result, setResult] = useState({});
    useEffect(() => {
        let eventList = []
        if (!s.state.contract) return;
        async function getEvents() {

            await s.state.contract.getPastEvents("CreateCardEvent", { fromBlock: 0, filter: { _address: s.state.accounts[0] } }).then(
                events => {
                    events.forEach(async e => {
                        let t = {}
                        t.blockNumber = e.blockNumber
                        t.ipfsHash = e.returnValues._ipfsHash
                        eventList.push(t)
                    })
                }
            )

            await s.state.contract.getPastEvents("EditCardEvent", { fromBlock: 0, filter: { _address: s.state.accounts[0] } }).then(
                events => {
                    events.forEach(async e => {
                        let t = {}
                        t.blockNumber = e.blockNumber
                        t.ipfsHash = e.returnValues._ipfsHash
                        eventList.push(t)
                    })
                }
            )

            await s.state.contract.getPastEvents("RenewCardEvent", { fromBlock: 0, filter: { _address: s.state.accounts[0] } }).then(
                events => {
                    events.forEach(async e => {
                        let t = {}

                        t.blockNumber = e.blockNumber
                        t.ipfsHash = e.returnValues._ipfsHash
                        eventList.push(t)
                    })
                }
            )
            let sorted = eventList.sort((a, b) => {
                return b.blockNumber - a.blockNumber;
            })
            var body = { encrypted: sorted[0].ipfsHash }

            axios.post('https://uid-server.karlocabugwang1.repl.co/decrypt', body).then(
                res => {
                    let t = res.data
                    setResult(t)
                }
            )
        }
        getEvents()
    }, [s.state])


    if (!s.state.contract) {
        return <div></div>;
    }
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
                <h3>{result.regDate && new Date(result.regDate).toLocaleDateString("en-US")}</h3>
                <span>Registration Date</span>
                <h3>{result.regDate && new Date(result.expDate).toLocaleDateString("en-US")}</h3>
                <span>Valid Until</span>

            </div>
        </div>
    );

}
export default Profile;

