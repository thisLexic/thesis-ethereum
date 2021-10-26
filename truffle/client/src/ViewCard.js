import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const ViewCard = (s) => {
  const [state, setState] = useState({});
  const [modalStatus, setModalStatus] = useState(false);
  const [result, setResult] = useState({
    idNumber: "",
    name:"",
    currentValidity:"",
    profession:"",
    birthDate:"",
    expDate:""
  });
  const [hash, setHash] = useState({
    hash:""
  })
  useEffect(() => {
    setState(s.state);
  }, [s.state])

  const onClose = e => {
    setModalStatus(false)
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
  
  const getObj = async (result) => {
    return fetch(`https://ipfs.infura.io/ipfs/${result}`)
    .then((response) => response.json())
    .then((responseJson) => {
      setResult( responseJson )
      setHash({hash:`https://ipfs.infura.io/ipfs/${result}`})
    })
    .catch((error) => {
      console.error(error);
    });
 }

  const handleSearchCard = async () => {

    const { idNumber } = state;
    await state.contract.methods.viewCard(idNumber).call().then(
      (resultArray => {
        if (resultArray==""){
          setModalStatus(true)
        } else {

          getObj(resultArray)

          //setResult( obj )
          //console.log()
        }
        
             

      })
    );
  };




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
        </div>
        <div class="results">
          <div>
            <h4>Name</h4>
            <h4>{!result.name && <span>&nbsp;</span>}{result.name}</h4>
          </div>
          <div>
            <h4>ID Number</h4>
            <h4>{!result.name && <span>&nbsp;</span>}{result.idNumber}</h4>
          </div>
          <div>
            <h4>Profession</h4>
            <h4>{!result.name && <span>&nbsp;</span>}{result.profession}</h4>
          </div>
          <div>
            <h4>Date of Birth</h4>
            <h4>{!result.name && <span>&nbsp;</span>}{result.birthDate}</h4>
          </div>
          <div>
            <h4>Expiration Date</h4>
            <h4>{!result.name && <span>&nbsp;</span>}{result.expDate}</h4>
          </div>
          
            
        </div>
        
        
      </div>
      {modalStatus && <div class="modal">
                <div>Card does not exist.</div>
                <div>
                    <button
                        onClick={e => {
                            onClose(e);
                        }}>
                        X
                </button>
                </div>


            </div>}
            <div>
            <h4>hash link</h4>
            <h4>{!hash.hash && <span>&nbsp;</span>}{hash.hash}</h4>
          </div>
    </div>
  )
}

export default ViewCard;
