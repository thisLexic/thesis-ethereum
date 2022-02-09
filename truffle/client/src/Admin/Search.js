import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import AddCPDUnits from '../AddCPDUnits';
import { create } from 'ipfs-http-client';
import EthCrypto from 'eth-crypto';

const Search = (s) => {
  const ipfs = create({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })
  const [state, setState] = useState({});
  const [modalStatus, setModalStatus] = useState({
    message: "",
    bool: false
  });
  const [cpdModal, setCpdModal] = useState(false);
  const [result, setResult] = useState({});

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

  useEffect(() => {
    if (!transactions.length == 0) {
      getObj(transactions[0].ipfsHash)
    } else {
      setResult({})
    }

  }, [transactions])

  const getObj = async (result) => {
    let currentAcc = JSON.parse(localStorage.getItem("account"))
    fetch(`https://ipfs.infura.io/ipfs/${result}`)
      .then((response) => response.json())
      .then((responseJson) => {
        EthCrypto.decryptWithPrivateKey(currentAcc.privateKey, responseJson).then(e =>
          setResult(JSON.parse(e))
        )
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleRenewCard = async () => {
    let obj = result
    obj.cpdUnits = "0"
    obj.cpdTaken = []
    let dateParse = obj.regDate.split("-")
    obj.regDate = `${parseInt(dateParse[0]) + 3}-${dateParse[1]}-${('0' + String(parseInt(dateParse[2]))).slice(-2)}`
    obj.validUntil = `${parseInt(dateParse[0]) + 6}-${dateParse[1]}-${('0' + String(parseInt(dateParse[2]) - 1)).slice(-2)}`
    setResult({ ...obj })
    const ipfsresult = await ipfs.add(JSON.stringify(result))

    await state.contract.methods
      .renewCard(result.idNumber, ipfsresult.path)
      .send({ from: state.accounts[0] });
    setModalStatus({ message: "Card Renewed!", bool: true });
  };

  const handleSearchCard = async () => {
    const { idNumber } = state;
    if (!isNaN(parseInt(idNumber))) {
      let event = []

      await state.contract.getPastEvents("CreateCardEvent", { fromBlock: 0, filter: { _idNumber: idNumber } }).then(
        element => {
          element.forEach(e => {
            let t = {
              blockNumber: e.blockNumber,
              transactionHash: e.transactionHash,
              event: e.event,
              ipfsHash: e.returnValues._ipfsHash
            }
            event.push(t)
          })
        }
      )

      await state.contract.getPastEvents("EditCardEvent", { fromBlock: 0, filter: { _idNumber: idNumber } }).then(
        element => {
          element.forEach(e => {
            let t = {
              blockNumber: e.blockNumber,
              transactionHash: e.transactionHash,
              event: e.event,
              ipfsHash: e.returnValues._ipfsHash
            }
            event.push(t)
          })
        }
      )

      await state.contract.getPastEvents("RenewCardEvent", { fromBlock: 0, filter: { _idNumber: idNumber } }).then(
        element => {
          element.forEach(e => {
            let t = {
              blockNumber: e.blockNumber,
              transactionHash: e.transactionHash,
              event: e.event,
              ipfsHash: e.returnValues._ipfsHash
            }
            event.push(t)
          })
        }
      )
      setTransactions(event.sort((a, b) => {
        return b.blockNumber - a.blockNumber;
      }))

      if (event.length == 0) {
        setModalStatus({ message: "Card does not exist.", bool: true })
      }
    } else {
      setModalStatus({ message: "Please input an integer.", bool: true })
    }


  }



  if (!state.web3) {
    return <div></div>;
  }
  return (

    <div class="search">
      <h1>Search</h1>
      <div className="searchBar">
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
            <h4>{!result.idNumber && <span>&nbsp;</span>}{result.idNumber}</h4>
            <span>Registration No.</span>
          </div>
          <div>
            <h4>{!result.idNumber && <span>&nbsp;</span>}{result.regDate}</h4>
            <span>Registration Date</span>
          </div>
          <div>
            <h4>{!result.idNumber && <span>&nbsp;</span>}{result.validUntil}</h4>
            <span>Valid Until</span>
          </div>
          <div>
            <h4>{!result.idNumber && <span>&nbsp;</span>}{result.profession}</h4>
            <span>Profession</span>
          </div>
        </div>

      </div>
      {result.idNumber && <div class="edit">
        <button type="button" onClick={e => { onCPDClick(e) }}>
          Add CPD Units
          </button>
      </div>}

      {modalStatus.bool && <div class="modal">
        <div>{modalStatus.message}</div>
        <div>
          <button onClick={e => { onClose(e) }}>
            X
          </button>
        </div>
      </div>}

      {cpdModal && <div class="cpdModal">
        <div><button onClick={e => { onCPDClose(e) }}>
          X
          </button>
          <AddCPDUnits state={state} res={result} />
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

export default Search;
