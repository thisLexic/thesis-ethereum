import React from "react";
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Timeline = () => {
    let navigate = useNavigate();
    const handleButton = async (e) => {
        navigate("cpd-form");
      }
    return (
        <div>
            <div>
            <button
        onClick={e => handleButton(e)}>
        Apply for a Card
    </button>
            </div>
            <Outlet/>
        </div>
    );

}
export default Timeline;

