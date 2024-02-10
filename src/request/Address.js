import { Alchemy, Network } from 'alchemy-sdk';
// import { useEffect, useState } from 'react';

// import SearchBar from './SearchBar';
import './App.css';

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

const Address = ({address, setAddress, transaction, setTrans}) => {

    const transResult = async () => {
        console.log(address)
         await alchemy.core.getBalance(address, 'latest')
        .then(result => {
          setTrans(result);
          
          console.log('trans: ')
          console.log(result)
        })
        .catch(error => console.error(error))
      }
    
      
       

    return ( 
        <div className="address">
         <p>address:  {address}</p>
            
            <p>ETH ballance: {parseFloat((transaction._hex)/10**18).toFixed(3)}</p>
            <button type="submit" onClick={transResult}>LOOK</button>
        </div>
     );
}
 
export default Address;
