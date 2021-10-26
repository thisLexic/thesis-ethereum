import React from "react";
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useEffect, useState } from "react";
import CardManager from "./contracts/CardManager.json";
import getWeb3 from "./getWeb3";
import AddBranch from './AddBranch';
import ViewCard from './ViewCard';
import AddCard from './AddCard';
import Home from './Home';


const Navbar = () => {
  const [state, setState] = useState({});
  useEffect(
    () => {
      //const web3 = await getWeb3();
      async function aquireWeb3() {
        let web3 = await getWeb3()
        let accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = CardManager.networks[networkId];
        const instance = new web3.eth.Contract(
          CardManager.abi,
          deployedNetwork && deployedNetwork.address
        );
        console.log(web3)
        setState({ web3: web3, accounts: accounts, contract: instance });
      }

      aquireWeb3()
      console.log(state)

      //const deployedNetwork = CardContract.networks[networkId];
      // const instance = new web3.eth.Contract(
      //   CardContract.abi,
      //   deployedNetwork && deployedNetwork.address
      // );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      //setState({ web3});
    }, [])
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
              <Link to="/addbranch" >Add Branch</Link>
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
          <Home />
        </Route>
        <Route path="/addcard">
          <AddCard state={state} />
        </Route>
        <Route path="/addbranch">
          <AddBranch state={state} />
        </Route>
        <Route path="/viewCard">
          <ViewCard state={state} />
        </Route>
      </Switch>
    </Router>
  )


}

export default Navbar