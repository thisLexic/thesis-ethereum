import React, { useEffect, useState } from "react";
import { create } from 'ipfs-http-client';


const AddCard = (s) => {
    
    const ipfs = create({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })
    const [state, setState] = useState({});
    const [card, setCard] = useState({});
    
    const [modalStatus, setModalStatus] = useState(false);
    useEffect(() => {
        setState(s.state);
    }, [s.state])


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let obj = card;
        setCard({ ...obj, [name]: value })

    }

    const onClose = e => {
        setModalStatus(false)
    };

    const handleSubmitCard = async () => {
        const {  idNumber, name, idNumberBranch } = card;
        const ipfsresult = await ipfs.add(JSON.stringify(card))
        const result = await state.contract.methods
            .createCard(idNumberBranch, idNumber, name, ipfsresult.path )
            .send({ from: state.accounts[0] });
        //console.log(result.events.cardCreated.returnValues);
        setModalStatus(true);
    };




    if (!state.web3) {
        return <div></div>;
    }
    return (
        <div class="AddCard">
            <div class="title">
                <h3>Add Card</h3>
            </div>
            

            <span>ID Number</span>
            <input
                type="text"
                name="idNumber"
                value={state.idNumber}
                onChange={e => handleInputChange(e)}
            />

            <span>Name</span>
            <input
                type="text"
                name="name"
                value={state.name}
                onChange={e => handleInputChange(e)}
            />

            <span>Profession</span>
            <input
                type="text"
                name="profession"
                value={state.profession}
                onChange={e => handleInputChange(e)}
            />

            <span>Date of Birth</span>
            <input
                type="text"
                name="birthDate"
                value={state.birthDate}
                onChange={e => handleInputChange(e)}
            />

            <span>Expiration Date</span>
            <input
                type="text"
                name="expDate"
                value={state.expDate}
                onChange={e => handleInputChange(e)}
            />

            <span>Location of Issuance</span>
            <input
                type="text"
                name="idNumberBranch"
                value={state.idNumberBranch}
                onChange={e => handleInputChange(e)}
            />

            <button type="button" onClick={() => handleSubmitCard()}>
                SUBMIT
            </button>
            {modalStatus && <div class="modal">
                <div>Card Created!</div>
                <div>
                    <button
                        onClick={e => {
                            onClose(e);
                        }}>
                        X
                </button>
                </div>


            </div>}
        </div>
    )
}

export default AddCard;