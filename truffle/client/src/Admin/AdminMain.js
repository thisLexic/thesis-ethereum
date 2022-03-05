import React, { useEffect, useState } from "react";
import { Link, Outlet } from 'react-router-dom';


const Main = (s) => {
  const [state, setState] = useState({});

  

  useEffect(() => {
    setState(s.state);
  }, [s.state])
  useEffect(() => {
    const navItems = ["/admin","/admin/requests","/admin/search"];
    let location =  window.location.pathname;
    let currentIndex = navItems.indexOf(location);
    let index = localStorage.getItem("currentAdm");
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
      localStorage.setItem("currentAdm", this.className.split(' ')[1])
    });
  }
  return (

    <div class="Main">
      <div class="bg" />
      <div class="body">
        <div class="sidebar">
          <div>
            <span className="navTitle"><Link to="/admin" className="navbtn 0">u.id</Link></span>
            <span>ADMIN</span>
            
          </div>
          <div>
            <span><Link to="requests" className="navbtn 1">REQUESTS</Link></span>
            <span><Link to="search" className="navbtn 2">SEARCH</Link></span>

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

