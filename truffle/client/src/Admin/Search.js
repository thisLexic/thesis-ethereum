import React, { useEffect, useState } from "react";
import { create } from 'ipfs-http-client';
import CryptoJS from 'crypto-js';

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
      let cardList = await s.state.contract.getPastEvents("RenewCardEvent", { fromBlock: 0})
      let cardResult = {}
      cardList.forEach(e => {
        if (e.returnValues._idNumber === idNumber) {
          cardResult = e
        }
      })
      if (Object.entries(cardResult).length === 0) {
        setModalStatus("Card does not exist.")
        setResultModal(true);
        setResult({});
      } else {
        fetch(`https://ipfs.infura.io/ipfs/${cardResult.returnValues._ipfsHash}`)
        .then((response) => response.json())
        .then((encrypted) => {
          var bytes = CryptoJS.AES.decrypt(encrypted, 'secret key 123');
          var originalText = bytes.toString(CryptoJS.enc.Utf8);
          setResult(JSON.parse(originalText))
        })
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
