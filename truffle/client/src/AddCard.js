import React, { useEffect, useState } from "react";
import { create } from 'ipfs-http-client';
import EthCrypto from 'eth-crypto';


const AddCard = (s) => {
    
    const ipfs = create({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })
    const [state, setState] = useState({});
    const [card, setCard] = useState({cpdUnits: "0"});
    
    const [modalStatus, setModalStatus] = useState(false);
    useEffect(() => {
        setState(s.state);
    }, [s.state])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let obj = card;
        setCard({ ...obj, [name]: value })

    }
    const handleInputChangeDate = (e) => {
        const { name, value } = e.target;
        let dateParse = value.split("-")
        let valid = `${parseInt(dateParse[0])+3}-${dateParse[1]}-${('0'+String(parseInt(dateParse[2])-1)).slice(-2)}`
        console.log(valid)

        let obj = card;

        setCard({ ...obj, [name]: value, validUntil:valid})

    }

    const onClose = e => {
        setModalStatus(false)
    };

    const handleSubmitCard = async () => {
        let currentAcc = JSON.parse(localStorage.getItem("account"))
        const encrypted = await EthCrypto.encryptWithPublicKey(
            currentAcc.publicKey ,// publicKey
            JSON.stringify(card) // message
        );

        const ipfsresult = await ipfs.add(JSON.stringify(encrypted))

        await state.contract.methods
            .createCard(card.idNumber, ipfsresult.path )
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
            
            <span>Last Name</span>
            <input
                type="text"
                name="lastName"
                value={state.lastName}
                onChange={e => handleInputChange(e)}
            />
            <span>First Name</span>
            <input
                type="text"
                name="firstName"
                value={state.firstName}
                onChange={e => handleInputChange(e)}
            />
            <span>Middle Name</span>
            <input
                type="text"
                name="middleName"
                value={state.middleName}
                onChange={e => handleInputChange(e)}
            />
            <span>Registration No.</span>
            <input
                type="text"
                name="idNumber"
                value={state.idNumber}
                onChange={e => handleInputChange(e)}
            />

            <span>Registration Date</span>
            <input
                type="date"
                name="regDate"
                value={state.regDate}
                onChange={e => handleInputChangeDate(e)}
            />
            
            <span>Profession</span>
            <input
                type="text"
                name="profession"
                value={state.profession}
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