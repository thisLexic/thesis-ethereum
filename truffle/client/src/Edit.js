import React, { Component } from "react";
import CardContract from "./contracts/Card.json";
import getWeb3 from "./getWeb3";

class Edit extends Component {
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
    const { name, idNumber, idNumberBranch, profession, birthDate, expDate } = this.state;
    alert(idNumber)
    const result = await this.state.contract.methods
      .createCard(name, idNumber, idNumberBranch, profession, birthDate, expDate )
      .send({ from: this.state.accounts[0] });
    console.log(result);
  };

  render() {
      console.log(this.state.web3);
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
        <div class="AddCard">
        <h3>Create Record</h3>

          

        <span>ID Number</span>
        <input
          type="text"
          name="idNumber"
          value={this.state.idNumber}
          onChange={this.handleInputChange}
        />

        <span>Name</span>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleInputChange}
        />

        <span>Profession</span>
        <input
          type="text"
          name="profession"
          value={this.state.profession}
          onChange={this.handleInputChange}
        />

        <span>Date of Birth</span>
        <input
          type="text"
          name="birthDate"
          value={this.state.birthDate}
          onChange={this.handleInputChange}
        />

        <span>Expiration Date</span>
        <input
          type="text"
          name="expDate"
          value={this.state.expDate}
          onChange={this.handleInputChange}
        />

        <span>Location of Issuance</span>
        <input
          type="text"
          name="idNumberBranch"
          value={this.state.idNumberBranch}
          onChange={this.handleInputChange}
        />
        <button type="button" onClick={this.handleSubmitCard}>
          SUBMIT
        </button>
        </div>
    );
  }
}

export default Edit;
