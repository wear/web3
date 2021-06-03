require('dotenv').config();
const APIKEY = process.env.APIKEY;

const Web3 = require('web3')
const rpcURL = `https://mainnet.infura.io/v3/${APIKEY}`
const web3 = new Web3(rpcURL)

const address = "0xC8978932c937692654Fc852acc8575903b4B749c"

web3.eth.getBalance(address, (err, wei) => {
  balance = web3.utils.fromWei(wei, 'ether')
  console.log(balance)
})
