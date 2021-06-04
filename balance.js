const web3 = require('./base').mainnet()

const address = "0xC8978932c937692654Fc852acc8575903b4B749c"

async function main() {
  const wei = await web3.eth.getBalance(address)
  balance = web3.utils.fromWei(wei, 'ether')
  console.log(balance)
}

main().catch((err) => {
  console.log("We have encountered an error!")
  console.error(err)
})


