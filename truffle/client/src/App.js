import React, { Component } from "react";
import CardContract from "./contracts/Card.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = {
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = CardContract.networks[networkId];
      const instance = new web3.eth.Contract(
        CardContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };

  handleSubmitCard = async () => {
    const { name, idNumber, idNumberBranch } = this.state;
    const result = await this.state.contract.methods
      .createCard(name, idNumber, idNumberBranch)
      .send({ from: this.state.accounts[0] });
    console.log(result);
  };

  handleSubmitBranch = async () => {
    const { location, idNumberBranchLocation } = this.state;
    const result = await this.state.contract.methods
      .createBranch(location, idNumberBranchLocation)
      .send({ from: this.state.accounts[0] });
    console.log(result);
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Thesis Prototype</h1>
        <h2>Add Card</h2>
        Name:{" "}
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleInputChange}
        />
        ID Number:{" "}
        <input
          type="text"
          name="idNumber"
          value={this.state.idNumber}
          onChange={this.handleInputChange}
        />
        Branch ID Number:{" "}
        <input
          type="text"
          name="idNumberBranch"
          value={this.state.idNumberBranch}
          onChange={this.handleInputChange}
        />
        <button type="button" onClick={this.handleSubmitCard}>
          Create Card
        </button>
        <h2>Add Branch</h2>
        Location:{" "}
        <input
          type="text"
          name="location"
          value={this.state.location}
          onChange={this.handleInputChange}
        />
        ID Number:{" "}
        <input
          type="text"
          name="idNumberBranchLocation"
          value={this.state.idNumberBranchLocation}
          onChange={this.handleInputChange}
        />
        <button type="button" onClick={this.handleSubmitBranch}>
          Create Branch
        </button>
      </div>
    );
  }
}

export default App;
