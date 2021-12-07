import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import AddCPDUnits from './AddCPDUnits';

const ViewCard = (s) => {
  const [state, setState] = useState({});
  const [modalStatus, setModalStatus] = useState({
    message: "",
    bool: false
  });
  const [cpdModal, setCpdModal] = useState(false);
  const [result, setResult] = useState({
    idNumber: "",
    firstName: "",
    lastName: "",
    middleName: "",
    profession: "",
    regDate: "",
    validUntil: ""
  });

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    setState(s.state);
  }, [s.state])

  const onClose = e => {
    setModalStatus({ message: "", bool: false })
  };

  const onCPDClick = e => {
    setCpdModal(true)
  };

  const onCPDClose = e => {
    setCpdModal(false)
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let obj = state;

    setState({ ...obj, [name]: value })

  }

  // handleGetCardCount = async () => {

  //   await this.state.contract.methods.getCardCount().call().then(
  //     (resultArray => {
  //       console.log(resultArray)
  //       this.setState({ cardCount: this.state.cardCount = resultArray[0] })
  //     })
  //   );
  // };
  useEffect(() => {
    if (!transactions.length == 0) {
      let ipfs = transactions.slice(-1)
      getObj(ipfs[0].ipfsHash)
    }

  }, [transactions])

  const getObj = async (result) => {
    return fetch(`https://ipfs.infura.io/ipfs/${result}`)
      .then((response) => response.json())
      .then((responseJson) => {
        setResult(responseJson)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleSearchCard = async () => {
    setTransactions([])

    const { idNumber } = state;
    if (!isNaN(parseInt(idNumber))) {
      await state.contract.getPastEvents("CreateCardEvent", { fromBlock: 0, filter: { _idNumber: idNumber } }).then(
        (events) => {
          console.log(events.length)
          if (events.length == 0) {
            setModalStatus({ message: "Card does not exist.", bool: true })
          } else {
            events.forEach(e => {
              let t = {
                transactionHash: e.transactionHash,
                event: e.event,
                ipfsHash: e.returnValues._ipfsHash
              }
              let currentTransactions = (prev => [...prev, t]);
              setTransactions(currentTransactions);
            })
          }
        })
    } else {
      setModalStatus({ message: "Please input an integer.", bool: true })
    }


  }



  if (!state.web3) {
    return <div></div>;
  }
  return (

    <div class="ViewCard">

      <div class="title">
        <h3>View Card</h3>
      </div>
      <div class="search">
        <input
          type="text"
          name="idNumber"
          placeholder="Id Number"
          value={state.idNumber}
          onChange={e => handleInputChange(e)}
        />
        <button type="button" onClick={() => handleSearchCard()}>
          SEARCH
        </button>
      </div>

      <div class="card">
        <div>
          <img src="person.png" />
          <div class="cpd">
            <h4>Current CPD Units: {result.cpdUnits}</h4>
          </div>
        </div>
        <div class="results">
          <div>
            <h4>Last Name</h4>
            <h4>{!result.idNumber && <span>&nbsp;</span>}{result.lastName}</h4>
          </div>
          <div>
            <h4>First Name</h4>
            <h4>{!result.idNumber && <span>&nbsp;</span>}{result.firstName}</h4>
          </div>
          <div>
            <h4>Middle Name</h4>
            <h4>{!result.idNumber && <span>&nbsp;</span>}{result.middleName}</h4>
          </div>
          <div>
            <h4>Registration No.</h4>
            <h4>{!result.idNumber && <span>&nbsp;</span>}{result.idNumber}</h4>
          </div>
          <div>
            <h4>Registration Date</h4>
            <h4>{!result.idNumber && <span>&nbsp;</span>}{result.regDate}</h4>
          </div>
          <div>
            <h4>Valid Until</h4>
            <h4>{!result.idNumber && <span>&nbsp;</span>}{result.validUntil}</h4>
          </div>
          <div>
            <h4>Profession</h4>
            <h4>{!result.idNumber && <span>&nbsp;</span>}{result.profession}</h4>
          </div>

        </div>


      </div>
      <div class="edit">
        <button type="button" onClick = { e => {onCPDClick(e) }}>
          Add CPD Units
          </button>
        <button type="button">
          Renew
          </button>

      </div>
      {modalStatus.bool && <div class="modal">
        <div>{modalStatus.message}</div>
        <div>
          <button onClick={e => { onClose(e) }}>
            X
          </button>
        </div>
      </div>}

      {cpdModal && <div class="cpdModal">
        <div><button onClick={e => {onCPDClose(e)}}>
            X
          </button>
          <AddCPDUnits state={state} res = {result}/>
          </div>
      </div>}

      {!transactions.length == 0 && <div>
        <Table responsive>
          <thead>
            <tr>
              <th>Transaction Hash</th>
              <th>Type</th>
              <th>IPFS Hash</th>
            </tr>
          </thead>
          <tbody>
            {Array.from(transactions).map((e, index) => (
              <tr>
                <td>{e.transactionHash}</td>
                <td>{e.event}</td>
                <td>{e.ipfsHash}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>}
    </div >
  )
}

export default ViewCard;
