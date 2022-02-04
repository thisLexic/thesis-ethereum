import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from './Home';
import Main from './Main';
import CardManager from "./contracts/CardManager.json";
import getWeb3 from "./getWeb3";
import CardForm from './CardForm';
import CPDForm from './CPDForm';
import Timeline from './Timeline';



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
        <Router>
          <Switch>
            <Route exact path="/" component={() => <Home state={state}/>}/>
            <Route exact path="/main" component={() => <Main state={state}/>} />
            <Route exact path="/apply/card" component={()=> <CardForm state={state}/>} />
            <Route exact path="/apply/cpd" component={()=> <CPDForm state={state}/>} />
            <Route exact path="/timeline" component={()=> <Timeline state={state}/>} />
            <Route />
          </Switch>
        </Router>
        
      </div>

    </div>

  );
}

export default App;