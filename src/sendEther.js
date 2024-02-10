import { Alchemy, Network } from 'alchemy-sdk';
// import { useEffect, useState } from 'react';

// import SearchBar from './SearchBar';
// import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);


async function main() {
    let tx = "0x46f4a0754cce83194f5e5427804a61c582429a2d9e3e198eb04c558de97a8040";

    let response = await alchemy.core.getBlockWithTransactions(tx)

    console.log(response)
}
main()