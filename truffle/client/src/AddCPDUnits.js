import React, { useEffect, useState } from "react";
import { create } from 'ipfs-http-client';


const AddCPDUnits = (s) => {
    
    const ipfs = create({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })
    const [state, setState] = useState({});
    const [card, setCard] = useState({});
    const [cpdTaken, setCpdTaken] = useState({});
    
    const [modalStatus, setModalStatus] = useState(false);
    useEffect(() => {
        setState(s.state)
        setCard(s.res)
    }, [s.state])

    
    const handleInputChange = (e) => {
        const { name, value } = e.target
        let obj = cpdTaken;
        setCpdTaken({ ...obj, [name]: value })
    }

    const onClose = e => {
        setModalStatus(false)
    };

    const handleSubmitCard = async () => {
        let obj = card
        console.log(cpdTaken)
        obj.cpdUnits = (+cpdTaken.units) + (+obj.cpdUnits)
        if (obj.cpdTaken){
            obj.cpdTaken = [...obj.cpdTaken,cpdTaken]
        } else {
            obj.cpdTaken= [cpdTaken]
        }
        
        setCard({ ...obj})
        console.log(card)
        const ipfsresult = await ipfs.add(JSON.stringify(card))

        await state.contract.methods
            .editCard(card.idNumber, ipfsresult.path )
            .send({ from: state.accounts[0] });
        setModalStatus(true);
    };




    if (!state.web3) {
        return <div></div>;
    }
    return (
        <div class="AddCPD">
            <div class="title">
                <h3>Add CPD Units</h3>
            </div>
            <span>Registration No.: {card.idNumber}</span>
            <span>Full Name: {card.lastName}, {card.firstName}, {card.middleName} </span>
            
            <span>Profession: {card.profession}</span>
            
            <span>Units: </span>
            <input
                type="text"
                name="units"
                value={state.units}
                onChange={e => handleInputChange(e)}
            />
            <span>Institution: </span>
            <input
                type="text"
                name="institution"
                value={state.institution}
                onChange={e => handleInputChange(e)}
            />
            

            <button type="button" onClick={() => handleSubmitCard()}>
                SUBMIT
            </button>
            {modalStatus && <div class="modal">
                <div>CPD Units Added!</div>
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

export default AddCPDUnits;