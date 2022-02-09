
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  return (
    <div class="dashboard">
      <div class="dashgrid1">
        <span>Hello, {localStorage.getItem("user")}!</span>
      </div>
      <div class="dashgrid2">
        <div id="card">
          <div class="img">
            <img src="person.png" />
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
        <div class="dashgridchild">

        </div>
      </div>
      <div class="dashgrid3">

      </div>
    </div>
  );

}
export default Dashboard;

