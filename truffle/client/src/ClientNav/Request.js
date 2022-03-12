import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { create } from 'ipfs-http-client';
import CPDForm from '../Form/CPDForm'
import axios from "axios";

const Request = (s) => {
    let navigate = useNavigate();
    const ipfs = create({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })
    const [result, setResult] = useState({});
    const [cpdUnits, setCpdUnits] = useState([]);
    const [totalUnits, setTotalUnits] = useState();
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
            axios.post('https://uid-server.herokuapp.com/decrypt', body).then(
                res => {
                    let t = res.data
                    setResult(t)
                    setCpdUnits(t.cpdUnits)
                    let value = 0
                    t.cpdUnits.forEach(e => {
                        value += parseInt(e.units)

                    })
                    setTotalUnits(value)

                }

            )
        }
        getEvents()
    }, [s.state])
    const handleButton = async (e) => {

        try {
            await axios.post('https://uid-server.herokuapp.com/encrypt', result).then(
                async res => {
                    await s.state.contract.methods
                        .requestRenewal(s.state.accounts[0], res.data)
                        .send({ from: s.state.accounts[0] });
                alert("Submitted!")
                })
        } catch(err) {
            alert(err)
        }
    }

    if (!s.state.contract) {
        return <div></div>;
    }
    return (
        <div className="request">
            <div className="cpdHistory">
                <h1>CPD Units</h1>
                <span>Current Units Taken: <b>{totalUnits}</b></span>
                <span>Remaining Units: <b>{15 - totalUnits}</b></span>
                <button disabled={15 - totalUnits !== 0}
                    onClick={e => handleButton(e)}>
                    RENEW CARD
                </button>
                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Institution</th>
                                <th>Units</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cpdUnits.map((e) => {
                                return (

                                    <tr className="row" data-active="false">
                                        <td>{e.completionDate}</td>
                                        <td>{e.institution}</td>
                                        <td>{e.units}</td>
                                    </tr>

                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <CPDForm state={s.state} />
            </div>

        </div>
    );

}
export default Request;

