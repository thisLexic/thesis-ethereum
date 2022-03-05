import React, { useEffect, useState } from "react";
import { Link, Outlet } from 'react-router-dom';


const Main = (s) => {

  useEffect(() => {
    const navItems = ["/main","/main/profile","/main/timeline","/main/request"];
    let location =  window.location.pathname;
    
    let currentIndex = navItems.indexOf(location)
    let index = localStorage.getItem("current");
    var current = document.getElementsByClassName(index);

      if (current.length===0 ) {
        document.getElementsByClassName(0)[0].className += " current"
       
      } else if ( currentIndex !== index ) {
        document.getElementsByClassName(currentIndex)[0].className += " current"
      }
      else {
        
        current[0].className += " current"
      }


  },[])

  

  


  var btns = document.getElementsByClassName("navbtn");
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
      var current = document.getElementsByClassName("current");
      current[0].className = current[0].className.replace(" current", "");
      this.className += " current";
      localStorage.setItem("current", this.className.split(' ')[1])
    });
  }
  return (

    <div class="Main">
      <div class="bg" />
      <div class="body">
        <div class="sidebar">
          <div>
          <span className="navTitle"><Link to="/main" className="navbtn 0">u.id</Link></span>
          </div>
          <div>
            <span><Link to="profile" className="navbtn 1">MY PROFILE</Link></span>
            <span><Link to="timeline" className="navbtn 2">TIMELINE</Link></span>
            <span><Link to="request" className="navbtn 3">REQUEST</Link></span>

          </div>
          <div>

          </div>
        </div>
        <div class="active">
          <Outlet />
        </div>
      </div>
    </div>
  );

}
export default Main;

