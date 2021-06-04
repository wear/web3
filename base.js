require('dotenv').config();

const APIKEY = process.env.APIKEY;
const Web3 = require('web3')
const mainnetRpcURL = `https://mainnet.infura.io/v3/${APIKEY}`
const ropstenRpcURL = `https://ropsten.infura.io/v3/${APIKEY}`

exports.mainnet = function (){
  return new Web3(mainnetRpcURL)
}

exports.ropsten = function(){
  return new Web3(ropstenRpcURL)
}
