require('dotenv').config();

const APIKEY = process.env.APIKEY;
const Web3 = require('web3')
const rpcURL = `https://ropsten.infura.io/v3/${APIKEY}`
const web3 = new Web3(rpcURL)

var Tx = require('ethereumjs-tx').Transaction
const account1 = "0x4Ff0D037630e8794B7a054fDb38e9B7319f85901"
const account2 = "0x160b74B15C3483648efcA3707D74593De86F8411"

const privateKey1 = Buffer.from(process.env.PRIVATE_KEY_1, 'hex')

web3.eth.getTransactionCount(account1, (err, txCount) => {
  const txObject = {
    nonce:    web3.utils.toHex(txCount),
    to:       account2,
    value:    web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
  }

  const tx = new Tx(txObject, { chain: 'ropsten', hardfork: 'petersburg' })
  tx.sign(privateKey1)
  
  const serializedTx = tx.serialize()
  const raw = '0x' + serializedTx.toString('hex')

  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log('txHash:', txHash)
  })
})

