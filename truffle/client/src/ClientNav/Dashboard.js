
import React, { useEffect, useState } from "react";
import Default from './Default';
import TimelineWidget from './TimelineWidget';
import ProfileWidget from './ProfileWidget';
import RequestWidget from './RequestWidget';
import axios from "axios";


const Dashboard = (s) => {
  const [resultModal, setResultModal] = useState(false)
  const [result, setResult] = useState({});
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
      if (!sorted.length) {
        setResultModal(true)
      } else {
        setResultModal(false)

        var body = { encrypted: sorted[0].ipfsHash }

        axios.post('https://uid-server.herokuapp.com/decrypt', body).then(
          res => {
            let t = res.data
            let value = 0
            t.cpdUnits.forEach(e => {
              value += parseInt(e.units)

            })
            setTotalUnits(value)

            setTotalUnits(value)
            setResult(t)
          }

        )

      }

    }
    getEvents()
  }, [s.state])

  if (!s.state.contract) {
    return <div></div>;
  }
  return (

    <div class="dashboard">
      {resultModal && <div className="modalDiv" data-active={resultModal}>
        <div className="modal">
          <Default state={s.state} />
        </div>
      </div>}
      <div class="dashgrid1">
        <span>Hello, {localStorage.getItem("user")}!</span>
      </div>
      <div class="dashgrid2">
        <ProfileWidget result={result} />
        <div class="dashgridchild">
          <RequestWidget result={result} totalUnits={totalUnits} />
        </div>
      </div>
      <div class="dashgrid3">
        <TimelineWidget state={s.state} />
      </div>
    </div>
  );

}
export default Dashboard;

