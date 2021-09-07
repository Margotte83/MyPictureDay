import React, { Component } from "react";
import Web3 from "web3";
import "./App.css";
import Navbar from"./nav.js"
import Footer from "./footer";

import Meme from "../abis/NftDay.json";

const isOnTestnetMumbai = true;
const CONTRACT_ADDRESS = "0xc341e8e5fF16c066056BE8311f772Bf69C7F94F8";

// execute ipfs locally
const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
}); // leaving out the arguments will default to these values

class App extends Component {

  //example: https://ipfs.infura.io/ipfs/QmQGcKiUSxk4XSh8NVqC9fLBiRPqH3xfmXWidWKngaiZcG
  constructor(props) {
    super(props);
    this.state = {
      memeHash: "QmTh1KqdbRT9uSRT7B4H5gho2g5KWukQ6dxeZdT4a957CS",
      buffer: null,
      contract: null,
      account: "",
      metamaskIsPresent: false,
    };
  }

  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      this.setMetamaskIsPresent(true);
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  setMetamaskIsPresent(isPresent){
    const state = {...this.state};
    state.metamaskIsPresent = isPresent;
    this.setState(state);
  }

  async loadBlockchainData() {

    if(isOnTestnetMumbai){

      this.loadDataForMetamask();
    }else{

      this.loadDataForTruffle();
    }
  }

  loadDataForMetamask(){

    // Metamask
    window.ethereum.request({method: 'eth_requestAccounts'}).then((accounts) => {

      console.log({accounts});
      this.setState({ account: accounts[0] });

      const contract = this.initContract(Meme.abi, CONTRACT_ADDRESS);
      this.setState({contract});

      this.loadContractData();


    }).catch((error) => {
      console.error(error);
    });
  }

  async loadDataForTruffle() {

    // Local Ganache
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    this.setState({account: accounts[0]});
    const networkId = 5777;
    const networkData = Meme.networks[networkId];

    console.log({accounts});
    console.log({networkId});
    console.log({Meme});
    console.log({networkData});

    console.log("networkData.address",networkData.address);

    const contract = this.initContract(Meme.abi, networkData.address);
    this.setState({contract});

    this.loadContractData();
  }

  initContract(abi,contractAddress){
    const web3 = new Web3(Web3.givenProvider);
    const contract  = new web3.eth.Contract(
        abi,
        contractAddress
    );

    return contract;
  }

  loadContractData(){
    // const memeHash = await contract.methods.get().call();
    this.state.contract.methods.get().call().then((memeHash)=>{

      this.setMemeHash(memeHash);

    }).catch((error)=>{
      console.error(error);
    });
  }

  setMemeHash = (memeHash) => {
    const newState = {...this.state};
    newState.memeHash = memeHash;
    this.setState(newState);
  }


  // When changing input, capture the file and process it
  captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) });
      console.log("buffer", this.state.buffer);
    };
  };
  // Submit file to ipfs
  onSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting file to ipfs...");
    ipfs.add(this.state.buffer, (error, result) => {
      console.log("Ipfs result", result);
      if (error) {
        console.error(error);
        return;
      }
      if (this.state.contract)

        console.log("account",this.state.account);

        this.state.contract.methods
          .set(result[0].hash)
          .send({ from: this.state.account })
          .then((r) => {
            // return this.setState({ memeHash: result[0].hash });
            console.log({r});
            this.setMemeHash(result[0].hash);
          });
    });
  };

  renderNotMetamask(){
    if(!this.state.metamaskIsPresent){
        return(
          <div>
          <div class="alert alert-warning" role="alert">
          To use this app, log into Metamask. Matic Testnet network.
        </div>
            <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a href="" target="_blank" rel="noopener noreferrer">
                  <img
                      src={`https://ipfs.infura.io/ipfs/${this.state.memeHash}`}
                  />
                </a>
                <p>You will be able to see the source code on <a href=""> my github link</a></p>
              </div>
            </main>
          </div>
          </div>

         
        );
    }
  }

  renderPicture(){
    if(this.state.metamaskIsPresent){
      return(
        <div>
        <div class="alert alert-primary" role="alert">
        Your Wallet: {this.state.account}
</div>
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a href="" target="_blank" rel="noopener noreferrer">
                  <img
                      src={`https://ipfs.infura.io/ipfs/${this.state.memeHash}`}
                  />
                </a>
                <h2>Change your picture</h2>
                <p>After sending, reload the page and or wait for the image of the day to appear.</p>
                <p>&nbsp;</p>
                <form onSubmit={this.onSubmit}>
                  <input type="file" onChange={this.captureFile} />
                  <input className="btn btn-primary" type="submit" />
                </form>
              </div>
            </main>
          </div>
          </div>
      );
    }
  }

  render() {
    return (
      <div>
        <Navbar/>
      <div className="container-fluid mt-5">
        <p>&nbsp;</p>
     
          {this.renderNotMetamask()}

          {this.renderPicture()}
          <Footer />
        </div>
        </div>
    );
  }
}

export default App;