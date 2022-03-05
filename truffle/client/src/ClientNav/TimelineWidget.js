import React, { useEffect, useState } from "react";

const TimelineWidget = (s) => {
    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
        if (!s.state.contract) return;
        let eventList = []
        async function getEvents() {

            await s.state.contract.getPastEvents("RequestCardEvent", { fromBlock: 0, filter: { _address: s.state.accounts[0] } }).then(
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

            await s.state.contract.getPastEvents("RequestCPDUnitsEvent", { fromBlock: 0, filter: { _address: s.state.accounts[0] } }).then(
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

            await s.state.contract.getPastEvents("RequestRenewalEvent", { fromBlock: 0, filter: { _address: s.state.accounts[0] } }).then(
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

            await s.state.contract.getPastEvents("CreateCardEvent", { fromBlock: 0, filter: { _address: s.state.accounts[0] } }).then(
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

            await s.state.contract.getPastEvents("EditCardEvent", { fromBlock: 0, filter: { _address: s.state.accounts[0] } }).then(
                events => {
                    events.forEach(async e => {
                        let t = {}
                        t.address = e.returnValues._address
                        t.blockNumber = e.blockNumber
                        t.transactionHash = e.transactionHash
                        t.event = "Add CPD Units"
                        t.ipfsHash = e.returnValues._ipfsHash
                        t.date = new Date(e.returnValues._time * 1000).toLocaleDateString("en-US")
                        eventList.push(t)
                    })
                }
            )

            await s.state.contract.getPastEvents("RenewCardEvent", { fromBlock: 0, filter: { _address: s.state.accounts[0] } }).then(
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
    return (
        <div className="timeline widget">
            <h2>Timeline</h2>
            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            
                            <th>Method</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                    {transactions.map((e, index) => {
                            return (

                                <tr className="row" data-active="false">
                                    <td>{transactions.length - index}</td>
                                    <td>{e.date}</td>
                                    <td>{e.event}</td>
                                </tr>

                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );

}
export default TimelineWidget;

