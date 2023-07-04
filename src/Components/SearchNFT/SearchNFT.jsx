import React, { useState } from 'react'
import Web3Modal from "web3modal";
import { ethers } from "ethers";
// import Web3Provider from 'web3-react'
import ABI from '../../smartContract_ABI/Abi.json'

export default function SearchNFT() {

    const [nftAddress, setNftAddress] = useState('')
    const [tokenID, setTokenID] = useState();

    const searchNFT = async (e) => {
        e.preventDefault();

        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        console.log("wallet Connect is done");
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        let contract = new ethers.Contract(nftAddress, ABI, signer);
        let transaction = await contract.tokenURI(tokenID)
        console.log(transaction);
    }

    return (
        <div>
            <label style={{ color: 'white' }} htmlFor="">NFT Address</label>
            <input value={nftAddress} onChange={(e) => { setNftAddress(e.target.value) }} type="text" />
            <br />
            <label style={{ color: 'white' }} htmlFor="">TokenID</label>
            <input value={tokenID} onChange={(e) => { setTokenID(Number(e.target.value)) }} type="text" />
            <button onClick={(e) => { searchNFT(e) }}>
                Search
            </button>
        </div>
    )
}
