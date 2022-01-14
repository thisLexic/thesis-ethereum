import React, { useEffect, useState } from "react";
import EthCrypto from 'eth-crypto';

const Home = (s) => {
  const [state, setState] = useState({});
  const [status, setStatus] = useState(false);
  useEffect(() => {
    setState(s.state);
    if (!localStorage.getItem("account")) {
      setStatus(true)
    } 
  }, [s.state])

  const onLogin = e => {
    try {
      const identity = EthCrypto.createIdentity();
      identity.address = state.accounts[0]
      console.log(identity)
      localStorage.setItem("account", JSON.stringify(identity))
      setStatus(false)
    } catch (error) {
      console.log(error)
    }
    
  };

  return (
    <div class="Home">
      <div class="under">
        <h1>u.id</h1>
        <h3>A blockchain-based identification system.</h3>
        {status && <button
          onClick={e => {
            onLogin(e);
          }}>
          Login
        </button>}
      </div>
    </div>
  );

}
export default Home;

