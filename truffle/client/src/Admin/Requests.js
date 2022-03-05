
import React, { useEffect, useState } from "react";
import CryptoJS from 'crypto-js';
import ViewCard from '../ViewCard';
import ViewCPD from '../ViewCPD';
import ViewRenew from '../ViewRenew';
import axios from "axios"

const Requests = (s) => {
    
    const [transactions, setTransactions] = useState([]);
    const [request, setRequest] = useState();
    const [result, setResult] = useState({});
    const [resultModal, setResultModal] = useState(false);
    const [totalUnits, setTotalUnits] = useState();
    let comp = {
        card: ViewCard,
        cpd: ViewCPD,
        renew: ViewRenew
    }
    let Modal = comp[request]
    
    useEffect(() => {
        if (!s.state.contract) return;
        let eventList = []
        async function getEvents() {

            await s.state.contract.getPastEvents("RequestRenewalEvent", { fromBlock: 0 }).then(
                events => {
                    events.forEach(async e => {
                        let t = {}
                        t.address = e.returnValues._address
                        t.blockNumber = e.blockNumber
                        t.transactionHash = e.transactionHash
                        let eventName = e.event.split(/(?=[A-Z])/)
                        eventName.pop(-1)
                        t.event = eventName.join(" ")
                        t.ipfsHash = e.returnValues._ipfsHash
                        t.date = new Date(e.returnValues._time * 1000).toLocaleDateString("en-US")
                        eventList.push(t)
                    })
                }
            )

            await s.state.contract.getPastEvents("RequestCPDUnitsEvent", { fromBlock: 0 }).then(
                events => {
                    events.forEach(async e => {
                        let t = {}
                        t.address = e.returnValues._address
                        t.blockNumber = e.blockNumber
                        t.transactionHash = e.transactionHash
                        let tempName = e.event.split(/(?=[A-Z])/)
                        let eventName =[tempName[0], tempName[1]+tempName[2]+tempName[3], tempName[4]]
                        t.event = eventName.join(" ") 
                        t.ipfsHash = e.returnValues._ipfsHash
                        t.date = new Date(e.returnValues._time * 1000).toLocaleDateString("en-US")
                        eventList.push(t)
                    })
                }
            )

            await s.state.contract.getPastEvents("RequestCardEvent", { fromBlock: 0 }).then(
                events => {
                    events.forEach(async e => {
                        let t = {}
                        t.address = e.returnValues._address
                        t.blockNumber = e.blockNumber
                        t.transactionHash = e.transactionHash
                        let eventName = e.event.split(/(?=[A-Z])/)
                        eventName.pop(-1)
                        t.event = eventName.join(" ")
                        t.ipfsHash = e.returnValues._ipfsHash
                        t.date = new Date(e.returnValues._time * 1000).toLocaleDateString("en-US")
                        eventList.push(t)
                    })
                }
            )
            
            setTransactions(eventList.sort((a, b) => {
                return b.blockNumber - a.blockNumber;
            }))
        }
        
        getEvents()
    }, [s.state])

    const handleButton = async (element, index, event) => {
        if (event == "Request Card") {
            setRequest("card")
        } else if (event == "Request CPD Units") {
            setRequest("cpd")
        } else if (event == "Request Renewal") {
            setRequest("renew")
        }
        var body = {encrypted: transactions[index].ipfsHash}

        axios.post('https://uid-server.karlocabugwang1.repl.co/decrypt', body).then(
            res => {
                let t = res.data
                t.address = transactions[index].address

                let value = 0
                if (t.cpdUnits == undefined) {
                    value=0
                }else {
                    t.cpdUnits.forEach(e => {
                        value += parseInt(e.units)
    
                    })
                }
                
                setTotalUnits(value)
                setResult(t)
            }

        )
        
        // fetch(`https://ipfs.infura.io/ipfs/${transactions[index].ipfsHash}`)
        //     .then((response) => response.json())
        //     .then((encrypted) => {
        //         var bytes = CryptoJS.AES.decrypt(encrypted, 'secret key 123');
        //         var originalText = bytes.toString(CryptoJS.enc.Utf8);
        //         
        //     })
        setResultModal(true)
    }

    const onClose = async (e) => {
        setResultModal(false)
    }

    
    return (

        <div className="requests">
            {resultModal && <div className="modalDiv" data-active={resultModal}>
                <div className="modal">
                    <div className="exitDiv">
                        <span className="exit" onClick={e => { onClose(e) }}>
                            X
                        </span>
                    </div>
                    <div>
                    <Modal result={result} state={s.state} totalUnits={totalUnits}/>
                    </div>
                    
                </div>
            </div>}

            <h1>Requests</h1>
            <div class="table">
                <table id="table1" >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Method</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((e, index) => {
                            return (

                                <tr className="row" data-active="false">
                                    <td>{transactions.length - index}</td>
                                    <td>{e.date}</td>
                                    <td>{e.event}</td>
                                    <td><button type="button" onClick={element => handleButton(element, index, e.event)}>
                                        VIEW
                                        </button></td>
                                </tr>

                            )
                        })}

                    </tbody>
                </table>
            </div>

        </div>
    );

}
export default Requests;

