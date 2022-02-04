import React, { useEffect, useState } from "react";
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Main = () => {
  let history = useHistory();
  const handleButton = async (e) => {
    history.push("/apply/card");
  }

  return (
    <div class="Main">
      <div class="bg" />
      <div class="body">
        <div class="sidebar">
          <div>
            u.id
          </div>
          <div>
            <span>MY PROFILE</span>
            <span>TIMELINE</span>
            <span>REQUEST</span>

          </div>
          <div>

          </div>
        </div>
        <div class="active">
          <div class="noCard">
            <span>You do not currently have a u.id card.</span>
            <button
              onClick={e => handleButton(e)}>
              Apply for a Card
            </button>
          </div>
          {/* <div class="dashboard">
            <div class="dashgrid1">
              <span>Hello, {localStorage.getItem("user")}!</span>
            </div>
            <div  class="dashgrid2">
              <div id="card">
                <div class="img">
                  <img src="person.png"/>
                </div>
                <div class="info">
                  <span>Last Name</span>
                  <span>First Name</span>
                  <span>Middle Name</span>
                  <span>Registration No.</span>
                  <span>Registration Date</span>
                  <span>Valid Until</span>
                  <span>Profession</span>
                </div>
              </div>
              <div id="profile">

              </div>
            </div>
            <div  class="dashgrid3">
              
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );

}
export default Main;

