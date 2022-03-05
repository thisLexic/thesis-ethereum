import React from "react";
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const RequestWidget = (s) => {
    let navigate = useNavigate();
    const handleButton = async (e) => {
        navigate("request");
    }
    return (
        <div className="request widget">
            <div>
            <span>Current Units Taken: <b>{s.totalUnits}</b></span>
            
            </div>
            <div>
            <span>Remaining Units: <b>{15-s.totalUnits}</b></span>
            </div>
            <div>
                <button
                    onClick={e => handleButton(e)}>
                    Add CPD Units
                </button>
            </div>

            <Outlet />
        </div>
    );

}
export default RequestWidget;

