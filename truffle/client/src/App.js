import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Manager from "./contracts/Manager.json";
import getWeb3 from "./getWeb3";
import { Default, Timeline, Dashboard, Request, Profile, CPDForm, CardForm, Home, Main, AdminMain, Requests, Search, Permissions } from "./index";

function App() {
  const [state, setState] = useState({});
  const [status, setStatus] = useState();

  useEffect(
    () => {
      async function aquireWeb3() {
        let web3 = await getWeb3()
        let accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = Manager.networks[networkId];
        const instance = new web3.eth.Contract(
          Manager.abi,
          deployedNetwork && deployedNetwork.address
        );
        setState({ web3: web3, accounts: accounts, contract: instance });
      }
      aquireWeb3()

    }, [state])


  return (

    <div className="App">
      <div id="content" className="content">
        <Routes>
          <Route exact path='/' element={<Home state={state} />} />
          <Route exact path='/permissions' element={<Permissions state={state} />} />
          <Route path='/admin' element={<AdminMain state={state} />}>
            <Route path='requests' element={<Requests state={state} />} />
            <Route path='Search' element={<Search state={state} />} />
          </Route>
          <Route path='/main/card-form' element={<CardForm state={state} />} />
          <Route path='/main' element={<Main />} >
            <Route path='/main' element={<Dashboard state={state}/>} />
            <Route path='profile' element={<Profile state={state} />} />
            <Route path='timeline' element={<Timeline state={state} />} />
            <Route path='request' element={<Request state={state}/>} />
          </Route>


        </Routes>
      </div>

    </div>

  );
}

export default App;