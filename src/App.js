import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

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

function App() {
  const [blockNumber, setBlockNumber] = useState();

  const [query, setQuery] = useState();
  
  const [input, setInput] = useState();

  const [addresses, setAddress] = useState();
  const [tx, setTran] = useState()

  // const [message, setMessage] = useState();

  const [gasPrice, setGasPrice] = useState();

  useEffect(() => {
    async function getBlockNumber() {
    const blockNum =  await alchemy.core.getBlockNumber();
    
      console.log(query)
      console.log(input)
       setBlockNumber(blockNum)
       
       if(input === ''){
        setAddress('')
        setTran('')
      }
    }

    getBlockNumber();
   
  }, [query, input]);


  // updating the best gas price
  useEffect(() => {

    async function getGas() {
      const gasPrice = await alchemy.core.getGasPrice()
      setGasPrice((parseInt(gasPrice._hex)/10**9).toFixed(5) )
    }
    getGas()
  }, [])


  // ballance address
  const addInfo = async () => {
    
      try {
        const result = await alchemy.core.getBalance(input, 'latest');
        setTran()
        setAddress(result);

        console.log('address info: ');
        console.log(result)
      } catch (error) {
       
        console.error(error);
      }
   
  };

  


// get transaction
const getTrans = async () => {
  if(input === ''){
    setAddress('')
    setTran('')
  }

 try {

  const result = await alchemy.core.getTransactionReceipt(input);
  setAddress()
  setTran(result);
  console.log('transaction info:')
  console.log(result)
 } catch(error) {
  
  console.error(error)
 }
    
}


  //result object for address

 const Transaction = ({addresses}) => {

    return (
      <div>
        <p>address:  {input}</p>
        
        <p>ETH ballance: {parseFloat((addresses._hex)/10**18).toFixed(3)}</p>
       
        
        {/* <p>difficulty: {transaction._difficulty._hex}</p> */}
      </div>
    )
  
      }



      
      // result object for transaction

      const TX = ({tx}) => {

        return (
          <div>
           
            <p>type: {tx.type}</p>
            <p>BlockHash: {tx.blockHash}</p>
            <p>block Bumber: {tx.blockNumber}</p>
            <p>Index: {tx.transactionIndex}</p>
            <p>confirms: {tx.confirmations}</p>
            
              <p>from : {tx.from}</p>
              <p>gas: {parseFloat((tx.gasUsed._hex)/10**9).toFixed(5)}</p>

              <p>to: {tx.to}</p>
            
          </div>
        )
      }



  return <div className="App">
    {/* <SearchBar value={blockTX}/> */}
   <h4> Block Number: {blockNumber}</h4>
   <h6>Best gas price: {gasPrice} QWEI</h6>
   <div className="searchBar">

            <input type="search" name="searchBar" id="searchBar" onChange={e => setInput(e.target.value)}/>

            <select name="query" id="query" onChange={e => setQuery(e.target.value)}>
              <option value="">choose</option>
              <option value="address">Address</option>
              <option value="transaction">transfer info</option>
            </select>

            {query === 'address' &&
            <button type="submit" onClick={addInfo}>LOOK</button>
            }
            
            {query === 'transaction' &&
            <button type="submit" onClick={getTrans}>LOOK</button>
            }

           { addresses  &&
            <Transaction  addresses={addresses}/>
           }

           { tx &&
            <TX  tx={tx}/>
           }

            
        </div>
    
    </div>;
}

export default App;





console.log((parseInt('0x5208')/10**6).toFixed(5))