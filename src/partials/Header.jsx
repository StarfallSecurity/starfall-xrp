import React, { useState, useEffect } from 'react';

import SearchModal from '../components/ModalSearch';
import Notifications from '../components/DropdownNotifications';
import Help from '../components/DropdownHelp';
import UserMenu from '../components/DropdownProfile';
import SearchForm from './actions/SearchForm';
import { fetchWalletByAddress } from '../services/network/wallet';
import { useNavigate } from 'react-router-dom';
import * as crypto from 'crypto';
import * as cc from 'five-bells-condition';
import { Buffer } from 'buffer';

function Header({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [blockchainName, setBlockchainName] = useState('ethereum');
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768); // Adjust breakpoint as needed

  const handleSearch = async (searchTerm) => {
    try {
      const response = await fetchWalletByAddress(searchTerm, blockchainName);
      if (response) {
        navigate(`/dashboard/wallet/${blockchainName}/${searchTerm}`);
        navigate(0);
      }
    } catch (error) {
      throw error;
    }
  };

  const onOptionChangeHandler = (e) => {
    setBlockchainName(e.target.value);
  };

  // Function to toggle the search bar on small screens
  const toggleSearchBar = () => {
    setIsSmallScreen(!isSmallScreen);
    setSearchModalOpen(true);
  };

  const addSeconds = (numOfSeconds, date = new Date()) => {
    date.setSeconds(date.getSeconds() + numOfSeconds);
    date = Math.floor(date / 1000)
    date = date - 946684800
    return date;
  }

  const main = async (condition, fulfillment_hex) => {

    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
    await client.connect()
    let faucetHost = null;
    const fund_result = await client.fundWallet()
    const test_wallet = fund_result.wallet
    console.log(fund_result)
    const my_wallet = (await client.fundWallet(null, { faucetHost })).wallet;
  
    const response = await client.request({
      "command": "account_info",
      "account": test_wallet.address,
      "ledger_index": "validated"
    })
    console.log(response)
  
    // Don't subscribe to events.
    // client.request({
    //   "command": "subscribe",
    //   "streams": ["ledger"]
    // })
    // client.on("ledgerClosed", async (ledger) => {
    //   console.log(`Ledger #${ledger.ledger_index} validated with ${ledger.txn_count} transactions!`)
    // })

    // Create conditional escrow.

    let escrow_cancel_date = new Date()
    escrow_cancel_date = addSeconds(parseInt(100))
    // Send 5 XRP to the escrow. Make sure it's less than the balance.
    const sendAmount = 5;

    const escrowTx = await client.autofill({
      "TransactionType": "EscrowCreate",
      "Account": test_wallet.address,
      "Amount": xrpl.xrpToDrops(sendAmount),
      "Destination": my_wallet.address,
      "CancelAfter": escrow_cancel_date,
      "Condition": condition
    });

    const signed = test_wallet.sign(escrowTx)
    const tx = await client.submitAndWait(signed.tx_blob)
    let results = "\nSequence Number (Save!): " + JSON.stringify(tx.result.Sequence)
    results  += "\n\nBalance changes: " + 
    JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2)
    
    // Here the results print out that the escrow was created.
    // Sequence Number (Save!): 42546416
    // Balance changes: [
    //   {
    //     "account": "rpiR5xPtSUkARrixBqgcyz6aWW24ip59eF",
    //     "balances": [
    //       {
    //         "currency": "XRP",
    //         "value": "-0.000012"
    //       }
    //     ]
    //   }
    // ]
    console.log(results);
    let standbyWalletBalance = await client.getXrpBalance(test_wallet.address)
    let myWalletBalance = await client.getXrpBalance(my_wallet.address)
    console.log("Standby Wallet Balance: " + standbyWalletBalance)
    console.log("My Wallet Balance: " + myWalletBalance)

    // Finish conditional escrow.
    const prepared = await client.autofill({
      "TransactionType": "EscrowFinish",
      "Account": my_wallet.address,
      "Owner": test_wallet.address,
      "OfferSequence": parseInt(tx.result.Sequence),
      "Condition": condition,
      "Fulfillment": fulfillment_hex
    })

    const fsigned = my_wallet.sign(prepared)
    const txx = await client.submitAndWait(fsigned.tx_blob)
    results = results  += "\nBalance changes: " + 
    JSON.stringify(xrpl.getBalanceChanges(txx.result.meta), null, 2)

    // Results should show transfered balance after condition was fulfilled.
    // Sequence Number (Save!): 42546782
    // Balance changes: [
    //   {
    //     "account": "rM5B9jdyJj6TztoqnJRK1dmEwsu4P36P8S",
    //     "balances": [
    //       {
    //         "currency": "XRP",
    //         "value": "-0.000012"
    //       }
    //     ]
    //   }
    // ]
    // Balance changes: [
    //   {
    //     "account": "rLrhuHRcxrGd5PeauQdJbJJbi7qThovsdw",
    //     "balances": [
    //       {
    //         "currency": "XRP",
    //         "value": "-0.000423"
    //       }
    //     ]
    //   }
    // ]
    // Standby Wallet Balance: 9999.999988
    // My Wallet Balance: 9999.999577
    console.log(results);
    standbyWalletBalance = await client.getXrpBalance(test_wallet.address)
    myWalletBalance = await client.getXrpBalance(my_wallet.address)
    console.log("Standby Wallet Balance: " + standbyWalletBalance)
    console.log("My Wallet Balance: " + myWalletBalance)


    await client.disconnect()
  }

  const getConditionAndFulfillment = () => {
  
    // Starfall to generate the hash telling whether the account should be blacklisted or not and generates the condition.
    const preimageData = crypto.randomBytes(32)
    const fulfillment = new cc.PreimageSha256()
    fulfillment.setPreimage(new Buffer('rLrhuHRcxrGd5PeauQdJbJJbi7qThovsdw failed blacklist validation'))
  
    const condition = fulfillment.getConditionBinary().toString('hex').toUpperCase()
    console.log('Condition:', condition)
   
    // Here the fulfillment should be fetched through the xprl hooks api. Then the serialized fulfillment should be used to finish the escrow.
    // We pass it in manually here.
    // https://hooks.xrpl.org/
    const fulfillment_hex = fulfillment.serializeBinary().toString('hex').toUpperCase()
    console.log('Fulfillment:', fulfillment_hex)
    return [condition, fulfillment_hex]
  }

  useEffect(() => {
    console.log("useEffect")
    const [condition, fulfillment_hex] = getConditionAndFulfillment();
    main(condition, fulfillment_hex);
    
  }, []);

  

  return (
    <header className="sticky top-0 bg-white border-b border-slate-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {isSmallScreen ? null : (
            <>
              <div className="w-8/12 lg:block">
                <SearchForm placeholder="Search by wallet address" onSearch={handleSearch} />
              </div>
              <div className="w-4/12 lg:block">
                <select onChange={onOptionChangeHandler} defaultValue="ethereum">
                  <option value="ethereum">ETH</option>
                  <option value="bitcoin">BTC</option>
                  <option value="binance">BNB</option>
                  <option value="base">BASE</option>
                  <option value="metis">METIS</option>
                  <option value="arbitrum">ARBITRUM</option>
                  <option value="polygon">POLYGON</option>
                  <option value="linea">LINEA</option>
                  <option value="XRP">XRP</option>
                </select>
              </div>
            </>
          )}

          {/* Header: Left side */}
          <div className={`flex ${isSmallScreen ? '' : 'hidden'}`}>
            {/* Hamburger button */}
            <button
              className="text-slate-500 hover:text-slate-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={(e) => {
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            {/* <div>
              <button
                className={`w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition duration-150 rounded-full ml-3 ${
                  searchModalOpen && 'bg-slate-200'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSearchModalOpen(true);
                }}
                aria-controls="search-modal"
              >
                <span className="sr-only">Search</span>
                <svg className="w-4 h-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path
                    className="fill-current text-slate-500"
                    d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z"
                  />
                  <path
                    className="fill-current text-slate-400"
                    d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z"
                  />
                </svg>
              </button>
              <SearchModal id="search-modal" searchId="search" modalOpen={searchModalOpen} setModalOpen={setSearchModalOpen} />
            </div> */}
            {/* <Notifications align="right" />
            <Help align="right" /> */}
            {/*  Divider */}
            {/* <hr className="w-px h-6 bg-slate-200 mx-3" /> */}

            {/* Small Screen: Search icon to open expanded search bar */}
            <button
              className="text-slate-500 hover:text-slate-600 ml-5 lg:hidden"
              onClick={toggleSearchBar}
              aria-controls="search-modal"
            >
              <span className="sr-only">Open Search</span>
              {isSmallScreen ? (
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="fill-current text-slate-500"
                    d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z"
                  />
                  <path
                    className="fill-current text-slate-400"
                    d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z"
                  />
                </svg>
              ) : (
                <svg className="w-4 h-4 fill-current">
                  <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
                </svg>
              )}
            </button>
            <div className={`lg:block ${isSmallScreen ? 'block' : 'hidden'}`}>
              <UserMenu align="right" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
