import React, { useEffect, useState } from "react";
import { create } from 'ipfs-http-client';


const AddCPDUnits = (s) => {
    
    const ipfs = create({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })
    const [state, setState] = useState({});
    const [result,setResult] = useState({});
    const [card, setCard] = useState({cpdUnits: "0"});
    
    const [modalStatus, setModalStatus] = useState(false);
    useEffect(() => {
        setState(s.state);
        setResult(s.res)
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

        const ipfsresult = await ipfs.add(JSON.stringify(card))

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
        <div class="AddCPD">
            <div class="title">
                <h3>Add CPD Units</h3>
            </div>
            <span>Registration No.: {result.idNumber}</span>
            <span>Full Name: {result.lastName}, {result.firstName}, {result.middleName} </span>
            
            <span>Profession: {result.profession}</span>
            
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

export default AddCPDUnits;