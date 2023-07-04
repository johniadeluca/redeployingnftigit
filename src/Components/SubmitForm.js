import React, { useState, useEffect } from 'react'
import { create as ipfsHttpClient } from "ipfs-http-client";
import { NFTStorage } from "nft.storage";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import ABI from "../smartContract_ABI/Abi.json";
import market from "../smartContract_ABI/market.json";
import AmendmentIcon from '../Assets/AmendmentIcon.png'
import fl from '../Assets/fl.png'
import rightTick from '../Assets/rightTick.png'
import editPencil from '../Assets/Pencil.png'
import purse from '../Assets/purse.png'
import Loader from '../Assets/Loader.png'
import ApproveError from '../Assets/ApproveError.png'
import purseError from '../Assets/purseError.png'
import ApproveSuccess from '../Assets/ApproveSuccess.png'
import { NFT_ADDRESS, STORAGE_NFT_TOKEN } from '../Utils/Keys';
import { errorMessage, successMessage } from '../Utils/Messages';
import axios from 'axios'
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");
const nftClient = new NFTStorage({
    token: STORAGE_NFT_TOKEN
});

const nftaddress = NFT_ADDRESS;
const nftmarketaddress = "0xeC97A40A429d16E12ad43bD05Ddee826a50308b3";


export default function SubmitForm({ amendentData, fetchedAmendentData, imageBase64 }) {
    console.log(amendentData, fetchedAmendentData);
    const [createNft, setCreateNft] = useState("");
    const [mintNftTx, setMintNftTx] = useState("");

    const [isOptimizeGas, setIsOptimizeGas] = useState(false);
    const [secondDisabled, setSecondDisabled] = useState(false);
    const [isSignInWithWallet, setIsSignInWithWallet] = useState(false)
    const [isTransactionApproved, setIsTransactionApproved] = useState(false);
    const [isTransactionApproved1, setIsTransactionApproved1] = useState(false);
    const [isTransactionApproved2, setIsTransactionApproved2] = useState(false);
    const [transactionButtonImage, setTransactionButtonImage] = useState(fl);
    const [transactionButtonImage1, setTransactionButtonImage1] = useState(editPencil);
    const [transactionButtonImage2, setTransactionButtonImage2] = useState(purse);
    const [transactionButtonText, setTransactionButtonText] = useState("Start Now")
    const [transactionButtonText1, setTransactionButtonText1] = useState("Start Now")
    const [transactionButtonText2, setTransactionButtonText2] = useState("Start Now")
    const [transactionButtonClass, setTransactionButtonClass] = useState("approve-transaction-button")
    const [transactionButtonClass1, setTransactionButtonClass1] = useState("approve-transaction-button")
    const [transactionButtonClass3, setTransactionButtonClass3] = useState("approve-transaction-button-disable")
    const [transactionButtonClass2, setTransactionButtonClass2] = useState("approve-transaction-button")
    const [transactionButtonClass4, setTransactionButtonClass4] = useState("approve-transaction-button-disable")

    const [loader, setLoader] = useState(false);
    const [loader1, setLoader1] = useState(false);
    const [loader2, setLoader2] = useState(false);

    const toggle = () => {
        setIsOptimizeGas(!isOptimizeGas);
        console.log(isOptimizeGas);
    }

    const signInWithWallet = (e) => {
        e.preventDefault();
        setIsSignInWithWallet(true)
    }

    async function getExampleImage(imageUrl) {
        // debugger;
        console.log(imageUrl);
        const imageOriginUrl = imageUrl;
        let r;

        try {
            r = await fetch(imageOriginUrl);
            console.log(r);
            if (!r?.ok) {
                throw new Error(`error fetching image: [${r.statusCode}]: ${r.status}`);
            }
            successMessage('Image Uploaded Succesfully')
            return r.blob();
        } catch (error) {
            errorMessage('Error Uploading Image')
        }
    }

    const getImageFromBase64 = (base64String) => {
        const byteCharacters = atob(base64String);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/*' });
        console.log(blob);
        return blob;
    }


    async function approveTransaction(e) {
        // debugger
        e.preventDefault();
        setLoader(true)
        let metadata;
        let imageParts;
        let key;
        let imageUrl;
        let image;
        if (fetchedAmendentData) {
            image = getImageFromBase64(imageBase64)
        }
        // if (fetchedAmendentData && String(fetchedAmendentData?.image).includes('http')) {
        //     image = await getExampleImage(fetchedAmendentData?.image)
        // } else if (fetchedAmendentData && !String(fetchedAmendentData?.image).includes('http')) {
        //     console.log(fetchedAmendentData?.image);
        //     // imageParts = fetchedAmendentData?.image.split('//')[1]
        //     // console.log(imageParts);
        //     // key = imageParts.split('/')
        //     // console.log(key);
        //     // imageUrl = `https://${key[0]}.ipfs.nftstorage.link/${key[1]}`
        //     imageUrl = String(fetchedAmendentData?.image).replace('ipfs://', 'https://ipfs.io/ipfs/')
        //     console.log(imageUrl);
        //     image = await getExampleImage(imageUrl)
        //     console.log(image);
        // }


        // let video = await getExampleImage(fetchedAmendentData.fileName.firstVideo)
        // console.log(video, image);
        // let blob = {
        //     firstVideo: video,
        //     songPdf: "",
        //     songXml: "",
        //     videoCoverPic: image
        // }



        if (fetchedAmendentData) {
            metadata = await nftClient.store(
                {
                    ...fetchedAmendentData,
                    name: fetchedAmendentData.name,
                    description: fetchedAmendentData.description,
                    image: image
                })
        } else {
            metadata = await nftClient.store({
                name: createNft.amendData.name,
                description: createNft.amendData.description,
                image: createNft.blobImageData.videoCoverPic,
                songData: createNft.previewSongData,
                fileName: createNft.amendData,
                files: [createNft.blobImageData],
            });
        }

        console.log(metadata.url);
        if (metadata.url) {
            mintNft(metadata.url);
        } else {
            setLoader(false);
        }

    }
    async function approveTransaction1(e) {
        e.preventDefault();
        setLoader1(true)
        // marketSell()
        setTimeout(() => {
            let result = true;
            if (result) {
                setTransactionButtonText1("Done");
                setIsTransactionApproved1(true);
                setTransactionButtonClass1('approve-transaction-button-success');
                setTransactionButtonImage1(ApproveSuccess);
                setLoader1(false)
            }
            else {
                setIsTransactionApproved1(false)
                setTransactionButtonText1("Failed")
                setTransactionButtonClass1('approve-transaction-button-fail');
                setTransactionButtonImage1(ApproveError)
                setLoader1(false)
            }
        }, 2000)


    }
    const approveTransaction2 = (e) => {
        e.preventDefault();
        setLoader2(true)
        setTimeout(() => {
            let result = true;
            if (result) {
                setTransactionButtonText2("Done");
                setIsTransactionApproved2(true);
                setTransactionButtonClass2('approve-transaction-button-success');
                setTransactionButtonImage2(ApproveSuccess);
                setLoader2(false)
            } else {
                setIsTransactionApproved2(false)
                setTransactionButtonText2("Failed")
                setTransactionButtonClass2('approve-transaction-button-fail');
                setTransactionButtonImage2(purseError)
                setLoader2(false)
            }
        }, 2000)
    }

    useEffect(() => {
        // debugger
        // window.scroll(0, 0)
        setCreateNft(amendentData)
    }, [amendentData, fetchedAmendentData])



    const mintNft = async (e) => {
        // debugger
        // console.log("hi");

        let newUrl
        // let CID = e?.split("//")[1]?.split("/")[0];
        // let CID1 = e?.split("//")[1]?.split("/")[1];
        // if (CID && CID1) {
        //     newUrl = `https://${CID}.ipfs.nftstorage.link/${CID1}`;
        // }
        newUrl = String(e).replace('ipfs://', 'https://ipfs.io/ipfs/')
        console.log(newUrl, "newUrl");

        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            console.log("wallet Connect is done");
            const provider = new ethers.providers.Web3Provider(connection);

            const signer = provider.getSigner();
            let contract = new ethers.Contract(nftaddress, ABI, signer);
            let transaction;
            if (fetchedAmendentData) {
                transaction = await contract.mintNFT(fetchedAmendentData.name, newUrl);
            } else {
                transaction = await contract.mintNFT(createNft.amendData.name, newUrl);
            }
            let tx = await transaction.wait();

            if (tx) {
                setMintNftTx(tx);
                // setTimeout(() => {
                setTransactionButtonText("Done");
                setIsTransactionApproved(true);
                setTransactionButtonClass('approve-transaction-button-success');
                setTransactionButtonImage(ApproveSuccess);
                setLoader(false)
                // }, 2000)
            } else {
                // setTimeout(() => {

                setIsTransactionApproved(false)
                setTransactionButtonText("Failed")
                setTransactionButtonClass('approve-transaction-button-fail');
                setTransactionButtonImage(ApproveError)
                // }, 2000)
                setLoader(false)
            }
        } catch (error) {
            console.log(error);
            errorMessage("Some Error Occured while minting NFT")
            setIsTransactionApproved(false)
            setTransactionButtonText("Failed")
            setTransactionButtonClass('approve-transaction-button-fail');
            setTransactionButtonImage(ApproveError)
            setLoader(false)
        }
    };

    const marketSell = async () => {
        // debugger
        let event = mintNftTx.events[0];
        let value = event.args[2];
        let tokenId = value.toNumber();

        const web3Modal = new Web3Modal();

        const price = ethers.utils.parseUnits("0.001", "ether");
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);

        //sign the transaction
        const signer = provider.getSigner();

        let contract = new ethers.Contract(nftmarketaddress, market, signer);



        let transaction = await contract.addNftToMarket(
            tokenId,
            price,
            { value: price, gasLimit: 3000000 }
        );
        if (transaction) {
            console.log("NFT market place also done");
            console.log(transaction, "NFT Market Place");
            setTimeout(() => {
                setTransactionButtonText1("Done");
                setIsTransactionApproved1(true);
                setTransactionButtonClass1('approve-transaction-button-success');
                setTransactionButtonImage1(ApproveSuccess);
                setLoader1(false)
            }, 2000)
            // setLoader(false);
        } else {
            setTimeout(() => {
                setIsTransactionApproved1(false)
                setTransactionButtonText1("Failed")
                setTransactionButtonClass1('approve-transaction-button-fail');
                setTransactionButtonImage1(ApproveError)
                setLoader1(false)
            }, 2000)
            // setLoader(false);
        }
    };



    return (
        <>

            <div className='d-flex flex-column amendment-modal-body-container'>

                <div className='d-flex amendment-modal-body-row'>
                    <div className='amendment-modal-body-row-image1'>
                        {
                            loader ? <div className='loader'></div> :
                                <img src={transactionButtonImage} alt="" />
                        }
                    </div>
                    <div className='amendment-modal-body-row-details d-flex flex-column'>
                        <p>Upload files & Mint token</p>
                        <p>Call contract method</p>

                    </div>
                </div>
                <div className='amendment-modal-body-btns d-flex flex-column'>
                    <button disabled={isTransactionApproved} className={transactionButtonClass}
                        onClick={approveTransaction}>
                        {
                            loader ? <img className='button-loader' src={Loader} /> : transactionButtonText
                        }
                    </button>

                    {transactionButtonText === "Failed" ? <p className='approve-error-text'>Something went wrong, please <span>try again</span> </p> : ""}
                </div>


                <div className='d-flex amendment-modal-body-row'>
                    <div className='amendment-modal-body-row-image1'>
                        {
                            loader1 ? <div className='loader'></div> :
                                <img src={transactionButtonImage1} alt="" />
                        }
                    </div>
                    <div className='amendment-modal-body-row-details d-flex flex-column'>
                        <p>Sign sell order</p>
                        <p>Sign sell order using your wallet</p>

                    </div>
                </div>
                <div className='amendment-modal-body-btns d-flex flex-column'>
                    <button disabled={isTransactionApproved1 || !isTransactionApproved} className={isTransactionApproved ? transactionButtonClass1 : transactionButtonClass3}
                        onClick={approveTransaction1}>
                        {
                            loader1 ? <img className='button-loader' src={Loader} /> : transactionButtonText1
                        }
                    </button>

                    {transactionButtonText1 === "Failed" ? <p className='approve-error-text'>Something went wrong, please <span className="tryAgainLink" onClick={approveTransaction1} >try again</span> </p> : ""}
                </div>



                <div className='d-flex amendment-modal-body-row'>
                    <div className='amendment-modal-body-row-image1'>
                        {
                            loader2 ? <div className='loader'></div> :
                                <img src={transactionButtonImage2} alt="" />
                        }
                    </div>
                    <div className='amendment-modal-body-row-details d-flex flex-column'>
                        <p>Sign lock order</p>
                        <p>Sign lock order using your wallet</p>

                    </div>
                </div>

                <div className='amendment-modal-body-btns d-flex flex-column'>
                    <button disabled={isTransactionApproved2 || !isTransactionApproved1} className={isTransactionApproved1 ? transactionButtonClass2 : transactionButtonClass4}
                        onClick={approveTransaction2}>
                        {
                            loader2 ? <img className='button-loader' src={Loader} /> : transactionButtonText2

                        }
                    </button>

                    {transactionButtonText2 === "Failed" ? <p className='approve-error-text'>Something went wrong, please <span className="tryAgainLink" onClick={approveTransaction2}>try again</span> </p> : ""}
                </div>
            </div>


        </>
    )
}
