import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Manager from "../contracts/Manager.json";
import getWeb3 from "../getWeb3";



const Default = (s) => {
  let navigate = useNavigate();
  const [status, setStatus] = useState();
  useEffect(() => {
    
    if (Object.keys(s.state).length != 0) {
      s.state.contract.getPastEvents("RequestCPDUnitsEvent", { fromBlock: 0 }).then(
        element => {
          if (Object.keys(element).length) return setStatus(false)
          setStatus(true)
        }
      )
    }


  }, [s.state])
  const handleButton = async (e) => {
    navigate("/main/card-form");
  }
  return (

    <div class="noCard">
      {status ? <span>"You do not currently have a u.id card."</span> : <span>"Your card is being processed."</span>}
      <button
        onClick={e => handleButton(e)}>
        Apply for a Card
    </button>
    </div>
  );

}
export default Default;

