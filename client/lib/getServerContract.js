import Web3 from 'web3';
import contractDefinition from '../../build/contracts/Market.json';

export default async () => {
  try {
    let web3 = new Web3(
      new Web3.providers.WebsocketProvider(process.env.BLOCKCHAIN_URL)
    );
    let networkId = await web3.eth.net.getId();
    let contract = new web3.eth.Contract(
      contractDefinition.abi,
      contractDefinition.networks[networkId].address
    );
    return contract;
  } catch (err) {
    console.log(err);
    return null;
  }
};
