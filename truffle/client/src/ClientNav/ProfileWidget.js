import React, { useEffect, useState } from "react";

import { useNavigate } from 'react-router-dom';

const ProfileWidget = (s) => {
    let navigate = useNavigate();

    const handleButton = async (e) => {
        navigate("/main/profile");
    }

    if (!s.result) {
        return <div></div>;
    }

    return (
        <div id="card">
        
            <div class="img">
                <img src="person.png" />
            </div>
            <div class="info">
                <div>
                    <span>Name: </span>
                    <span>{s.result.firstName} {s.result.middleName ? `${s.result.middleName.charAt(0)}.` : " "} {s.result.lastName}</span>
                </div>
                <div>
                    <span>Profession: </span>
                    <span>{s.result.profession}</span>
                </div>
                <div>
                    <span>Registration No: </span>
                    <span>{s.result.id}</span>
                </div>
                <div>
                    <span>Registration Date: </span>
                    <span>{s.result.regDate && new Date(s.result.regDate).toLocaleDateString("en-US")}</span>
                </div>
                <div>
                    <button onClick={e => handleButton(e)}>View Profile</button>
                </div>
                
            </div>
        </div>
    );

}
export default ProfileWidget;

