const web3 = require('./base').ropsten()


const account1 = "0x4Ff0D037630e8794B7a054fDb38e9B7319f85901"
const account2 = "0x160b74B15C3483648efcA3707D74593De86F8411"

const privateKey1 = Buffer.from(process.env.PRIVATE_KEY_1, 'hex')

async function main() {
  const txCount = await web3.eth.getTransactionCount(account1)
  
  const txObject = {
    nonce:    web3.utils.toHex(txCount),
    to:       account2,
    value:    web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
  }

  const raw = localSignTransaction(txObject, privateKey1)
  const txHash = await web3.eth.sendSignedTransaction(raw)

  console.log(`You can visit https://ropsten.etherscan.io/tx/${txHash['transactionHash']} for detail`)
}

main().catch((err) => {
  console.log("We have encountered an error!")
  console.error(err)
})

function localSignTransaction(txObject, privateKey) {
  let Tx = require('ethereumjs-tx').Transaction
  const tx = new Tx(txObject, { chain: 'ropsten', hardfork: 'petersburg' })
  tx.sign(privateKey)
  
  const serializedTx = tx.serialize()
  const raw = '0x' + serializedTx.toString('hex')  
  return raw
}
