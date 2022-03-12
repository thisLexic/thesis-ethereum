import React, { useEffect, useState } from "react";
import { create } from 'ipfs-http-client';
import axios from "axios";


const Search = (s) => {
  const ipfs = create({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })
  const [modalStatus, setModalStatus] = useState();
  const [resultModal, setResultModal] = useState(false);
  const [result, setResult] = useState({});
  const [input, setInput] = useState({})

  const onClose = e => {
    setResultModal(false)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let obj = input;
    setInput({ ...obj, [name]: value })
  }


  const handleSearchCard = async () => {
    const { idNumber } = input;
    if (isNaN(parseInt(idNumber))) {
      setModalStatus("Please input an integer.")
      setResultModal(true);

    }
    else {
      let eventList = []
      await s.state.contract.getPastEvents("CreateCardEvent", { fromBlock: 0}).then(
        events => {
          events.forEach(async e => {
            eventList.push(e)
          })
        }
      )

      await s.state.contract.getPastEvents("EditCardEvent", { fromBlock: 0}).then(
        events => {
          events.forEach(async e => {
            eventList.push(e)
          })
        }
      )

      await s.state.contract.getPastEvents("RenewCardEvent", { fromBlock: 0}).then(
        events => {
          events.forEach(async e => {
            eventList.push(e)
          })
        }
      )
      let sorted = eventList.sort((a, b) => {
        return b.blockNumber - a.blockNumber;
      })

      let cardResult = {}
      console.log(sorted)
      sorted.forEach(e => {
        if (e.returnValues._idNumber === idNumber) {
          cardResult = e
          console.log(e)
        }
      })
      if (Object.entries(cardResult).length === 0) {
        setModalStatus("Card does not exist.")
        setResultModal(true);
        setResult({});
      } else {
        let body = {encrypted: cardResult.returnValues._ipfsHash}
        axios.post('https://uid-server.herokuapp.com/decrypt',body).then(
          res => {
            let t = res.data
            console.log(t)
            setResult(t)
          }
        )
      }
    }

  }



  return (

    <div class="search">
      {resultModal && <div className="modalDiv" data-active={resultModal}>
        <div className="modal">
          <div className="exitDiv">
            <span className="exit" onClick={e => { onClose(e) }}>
              X
                        </span>
          </div>
          <div>
            {modalStatus}
          </div>

        </div>
      </div>}
      <h1>Search</h1>
      <div className="searchBar">
        <input
          type="text"
          name="idNumber"
          placeholder="Id Number"
          value={s.state.idNumber}
          onChange={e => handleChange(e)}
        />
        <button type="button" onClick={() => handleSearchCard()}>
          SEARCH
        </button>
      </div>

      <div class="result">
        <div>
          <div>
            <h4>{!result.idNumber && <span>&nbsp;</span>}{result.lastName}</h4>
            <span>Last Name</span>
          </div>
          <div>
            <h4>{!result.idNumber && <span>&nbsp;</span>}{result.firstName}</h4>
            <span>First Name</span>
          </div>
          <div>
            <h4>{!result.idNumber && <span>&nbsp;</span>}{result.middleName}</h4>
            <span>Middle Name</span>
          </div>
          <div>
            <h4>{!result.idNumber && <span>&nbsp;</span>}{result.id}</h4>
            <span>Registration No.</span>
          </div>
          <div>
            <h4>{!result.idNumber && <span>&nbsp;</span>}{result.regDate && new Date(result.regDate).toLocaleDateString("en-US")}</h4>
            <span>Registration Date</span>
          </div>
          <div>
            <h4>{!result.idNumber && <span>&nbsp;</span>}{result.regDate && new Date(result.expDate).toLocaleDateString("en-US")}</h4>
            <span>Valid Until</span>
          </div>
          <div>
            <h4>{!result.idNumber && <span>&nbsp;</span>}{result.profession}</h4>
            <span>Profession</span>
          </div>
        </div>

      </div>
    </div >
  )
}

export default Search;
