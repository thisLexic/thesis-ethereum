import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Default = (s) => {
  let navigate = useNavigate();
  const [status, setStatus] = useState();
  useEffect(() => {

    if (Object.keys(s.state).length != 0) {
      s.state.contract.getPastEvents("RequestCardEvent", { fromBlock: 0, filter: { _address: s.state.accounts[0] } }).then(
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

    <div class="default">
      {status ?
        <div>
          <div>
            <span>You do not currently have a u.id card.</span>
          </div>
          <div>
            <button
              onClick={e => handleButton(e)}>
              Apply for a Card
      </button>
          </div>

        </div>
        : <div>
          <span>Your card is being processed.</span>
        </div>}

    </div>
  );

}
export default Default;

