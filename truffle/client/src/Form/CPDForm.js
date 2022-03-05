import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { create } from 'ipfs-http-client';
import axios from "axios"



const CPDForm = (s) => {
    let navigate = useNavigate();
    const [result, setResult] = useState({});
    const [input, setInput] = useState({})
    const ipfs = create({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })
    useEffect(() => {
        if (!s.state.contract) return;
        let eventList = []
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
                    let value = 0
                    t.cpdUnits.forEach(e => {
                        value += parseInt(e.units)
                    })
                    setResult(t)
                }
            )
        }
        getEvents()
    }, [s.state])



    const handleButton = async (e) => {
        let t = result
        let current = t.cpdUnits;
        current.push(input);
        t.cpdUnits = current;
        console.log(t)

        try {
            await axios.post('https://uid-server.karlocabugwang1.repl.co/encrypt', t).then(
                async res => {
                    await s.state.contract.methods
                        .requestCPDUnits(s.state.accounts[0], res.data)
                        .send({ from: s.state.accounts[0] });
                    alert("Submitted!")
                })
        } catch (err) {
            alert(err)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        let obj = input;
        setInput({ ...obj, [name]: value })
    }
    return (

        <div class="form-request cpd">
            <h1>Submit CPD Units</h1>
            <span>Units</span>
            <input
                type="text"
                name="units"
                value={input.units}
                onChange={e => handleChange(e)}
            />
            <span>Institution</span>
            <input
                type="text"
                name="institution"
                value={input.institution}
                onChange={e => handleChange(e)}
            />
            <span>Date of Completion</span>
            <input
                type="date"
                name="completionDate"
                value={input.completionDate}
                onChange={e => handleChange(e)}
            />
            <button
                onClick={e => handleButton(e)}>
                SUBMIT
            </button>
        </div>

    );
}
export default CPDForm;
