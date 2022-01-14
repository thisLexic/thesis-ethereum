import React from "react";
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useEffect, useState } from "react";
import CardManager from "./contracts/CardManager.json";
import getWeb3 from "./getWeb3";
import ViewCard from './ViewCard';
import AddCard from './AddCard';
import Home from './Home';



const Navbar = () => {
  const [state, setState] = useState({});
  useEffect(
    () => {
      async function aquireWeb3() {
        let web3 = await getWeb3()
        let accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = CardManager.networks[networkId];
        const instance = new web3.eth.Contract(
          CardManager.abi,
          deployedNetwork && deployedNetwork.address
        );        
        setState({ web3: web3, accounts: accounts, contract: instance});
      }

      aquireWeb3()
      
    }, [state.accounts])
  return (
    <Router>
      <div class="Navbar">
        <div>
          <Link to="/" >u.id</Link>
        </div>
        <div>
          <ul>
            <li class="title">

            </li>
            <li>
              <Link to="/addcard" >Add Card</Link>
            </li>
            <li>
              <Link to="/viewCard" >View Card</Link>
            </li>
          </ul>
        </div>
        <div>
          <img src="search-solid.svg" />
        </div>


      </div>
      <Switch>
        <Route exact path="/">
          <Home state={state}/>
        </Route>
        <Route path="/addcard">
          <AddCard state={state} />
        </Route>
        <Route path="/viewCard">
          <ViewCard state={state} />
        </Route>
      </Switch>
    </Router>
  )


}

export default Navbar