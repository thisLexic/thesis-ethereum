
import React, { useEffect, useState } from "react";
import CryptoJS from 'crypto-js';
import ViewCard from '../ViewCard';


const Requests = (s) => {
    const [transactions, setTransactions] = useState([]);
    const [result, setResult] = useState({});
    const [resultModal, setresultModal] = useState(false)
    useEffect(() => {
        let eventList = []
        async function getEvents() {

            let events = await s.state.contract.getPastEvents("RequestCardEvent", { fromBlock: 0 })
            console.log(events)
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
            setTransactions(eventList.sort((a, b) => {
                return b.blockNumber - a.blockNumber;
            }))
        }
        getEvents()
    }, [s.state])

    const handleButton = async (e, index) => {
        fetch(`https://ipfs.infura.io/ipfs/${transactions[index].ipfsHash}`)
            .then((response) => response.json())
            .then((encrypted) => {
                var bytes = CryptoJS.AES.decrypt(encrypted, 'secret key 123');
                var originalText = bytes.toString(CryptoJS.enc.Utf8);
                let t = JSON.parse(originalText)
                t.address = transactions[index].address
                console.log(t)
                setResult(t)
            })
        setresultModal(true)
    }

    const onClose = async (e) => {
        setresultModal(false)
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
                    
                    <ViewCard result={result} state={s.state} />
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
                            console.log(e)
                            return (

                                <tr className="row" data-active="false">
                                    <td>{transactions.length - index}</td>
                                    <td>{e.date}</td>
                                    <td>{e.event}</td>
                                    <td><button type="button" onClick={e => handleButton(e, index)}>
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

