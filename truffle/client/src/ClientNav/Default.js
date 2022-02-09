import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';



const Default = () => {
  let navigate = useNavigate();
  const handleButton = async (e) => {
    navigate("/main/card-form");
  }

  return (
    <div class="noCard">
      <span>You do not currently have a u.id card.</span>
      <button
        onClick={e => handleButton(e)}>
        Apply for a Card
    </button>
    </div>
  );

}
export default Default;

