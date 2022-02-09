import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import CardManager from "./contracts/CardManager.json";
import getWeb3 from "./getWeb3";
import { Default, Timeline, Dashboard, Request, Profile, CPDForm, CardForm, Home, Main, AdminMain, Requests, Search } from "./index";

function App() {
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
        setState({ web3: web3, accounts: accounts, contract: instance });
      }

      aquireWeb3()

    }, [state.accounts])

  return (

    <div className="App">

      <div id="content" className="content">
        <Routes>
            <Route exact path='/' element={<Home state={state}/>} />
            <Route path='/admin' element={<AdminMain state={state}/>}> 
              <Route path='requests' element={<Requests />} />
              <Route path='Search' element={<Search state={state}/>} />
            </Route> 
            <Route path='/main/card-form' element={<CardForm state={state}/>}/>
            <Route path='/main' element={<Main />} >
              <Route path='/main' element={(true) ? <Dashboard />: <Default/>} />
              <Route path='profile' element={<Profile />} />
              <Route path='timeline' element={<Timeline />} />
              <Route path='request' element={<Request />} >
                <Route path='cpd-form' element={<CPDForm />} />
              </Route>
            </Route>


        </Routes>
      </div>

    </div>

  );
}

export default App;