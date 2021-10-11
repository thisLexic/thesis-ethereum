import React, { useEffect, useState } from "react";

const AddBranch = (s) => {
  const [state, setState] = useState({});
  const [modalStatus, setModalStatus] = useState(false);
  useEffect(() => {
    setState(s.state);
  }, [s.state])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let obj = state;

    setState({ ...state, [name]: value })

  }

  const onClose = e => {
    setModalStatus(false)
  };

  const handleSubmitBranch = async () => {
    const { location, idNumberBranchLocation } = state;
    const result = await state.contract.methods
      .createBranch(location, idNumberBranchLocation)
      .send({ from: state.accounts[0] });
      setModalStatus(true);
  }

  if (!state.web3) {
    return <div></div>;
  }
  return (
    <div class="AddBranch">
      <div class="title">
        <h3>Add Branch</h3>
      </div>
      
      <span>Location</span>
      <input
        type="text"
        name="location"
        value={state.location}
        onChange={e => handleInputChange(e)}
      />
      <span>Branch Number</span>
      <input
        type="text"
        name="idNumberBranchLocation"
        value={state.idNumberBranchLocation}
        onChange={e => handleInputChange(e)}
      />
      <button type="button" onClick={() => handleSubmitBranch()}>
        SUBMIT
      </button>
      {modalStatus && <div class="modal">
                <div>Branch Created!</div>
                <div>
                    <button
                        onClick={e => {
                            onClose(e);
                        }}>
                        Close
                </button>
                </div>


            </div>}
    </div>
  )
}

export default AddBranch;
