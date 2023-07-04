import React, { useState, useEffect } from "react";

import { create as ipfsHttpClient } from "ipfs-http-client";
import { NFTStorage } from "nft.storage";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import ABI from "../../smartContract_ABI/Abi.json";
import market from "../../smartContract_ABI/market.json";
import "./Amend.css";

// import itemImage from '../../Assets/itemPic.png'
import ProfilePic from "../../Assets/profllePic.png";
import profilePic2 from "../../Assets/profilePic2.png";
import Like from "../../Assets/Heart.png";
import Exit from "../../Assets/Exit.png";
import Menu from "../../Assets/Menu.png";
import FileUpload from "../../Assets/FileUpload.png";
import item1Image from "../../Assets/item1Image.png";
import ItemPic3 from "../../Assets/ItemPic3.png";
import crossIcon from "../../Assets/crossIcon.png";
import onlineIcon from "../../Assets/onlineIcon.png";
import AmendSubmit from "./AmendSubmit";
import { NFT_ADDRESS, STORAGE_NFT_TOKEN } from "../../Utils/Keys";
import axios from "axios";
import { errorMessage, successMessage } from "../../Utils/Messages";
// import CloseIcon from '../../Assets/CloseIcon.png'
import LoaderRotate from "../../Utils/Loader";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");
const NFT_STORAGE_TOKEN = STORAGE_NFT_TOKEN

const nftClient = new NFTStorage({
  token: NFT_STORAGE_TOKEN,
});

const nftaddress = NFT_ADDRESS;
const nftmarketaddress = "0x6A28E640ac5681c41347364592eb9394BD6D29A8";

async function getAccount(data) {
  if (data) {
    // debugger

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    // let TotalAmount = await getBalance(account)

    // if(TotalAmount){
    return account;

    // }
  } else {
    const account = null;
    return account;
  }
}

export default function Amend({ sendAmendNFTData }) {
  console.log(sendAmendNFTData);
  const [amendmentPage, setAmendmentPage] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [isPurchased, setIsPurchased] = useState(true);
  const [imagePath, setImagePath] = useState("");
  const [accountAddress, setAccountAddress] = useState("");
  const [modalHeading, setModalHeading] = useState("Submit Amendment");
  const [amendData, setAmendDate] = useState({});
  const [amendNFTData, setAmendNFTData] = useState({});
  const [dollarPrice, setDollarPrice] = useState(1);
  const [amendent, setAmendent] = useState({
    name: "",
    description: "",
    newFile: "",
  });
  const [propAmendment, setPropAmendment] = useState({});
  const [loader, setLoader] = useState(false)

  const amendmentCLick = (e) => {
    e.preventDefault();
    setAmendmentPage(true);
  };

  const submitAmendment = (e) => {
    e.preventDefault();
    // setAmendmentPage(false);
    setisModalOpen(!isModalOpen);
  };

  const test = () => {
    console.log("test");
    setIsMenuOpen(!isMenuOpen);
  };

  const changeModalHeading = (heading) => {
    setModalHeading(heading);
  };
  useEffect(() => {
    // debugger;
    window.scroll(0, 0);
    setAmendNFTData(sendAmendNFTData);
    setAmendent((prevState) => ({
      ...prevState,

      name: sendAmendNFTData.name,
      description: sendAmendNFTData.description,
    }));
    convertToDollar(sendAmendNFTData?.price)
    console.log(sendAmendNFTData);
  }, [sendAmendNFTData]);

  const handleChange = (e) => {
    // debugger;
    e.preventDefault();
    setAmendDate(e.target.value);
    const { name, value } = e.target;

    setAmendent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function onChange(e) {
    // debugger
    setLoader(true)
    const file = e.target.files[0];
    const { name } = file;

    try {
      let bodyContent = new FormData();
      bodyContent.append("file", file);
      const resT = await axios.post(
        "https://api.nft.storage/upload",
        bodyContent,
        {
          headers: {
            Authorization: `Bearer ${STORAGE_NFT_TOKEN}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(resT);

      let url = `https://ipfs.io/ipfs/${resT.data.value.cid}/${file.name}`

      setImagePath(url);
      setAmendent((prevState) => ({
        ...prevState,
        newFile: {
          IPFSUrl: url,
          name: name
        },
      }));
      setLoader(false)
      successMessage("File Uploaded Succesfully")
    } catch (e) {
      console.log("Error uploading file: ", e);
      setLoader(false)
      errorMessage("Error uploading file")
    }
  }

  const convertToDollar = async (price) => {
    let convertedPrice = 0;
    try {
      let data = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum', {
        method: 'GET'
      })

      let dataObject = await data.json();
      convertedPrice = price * dataObject[0]?.current_price
      setDollarPrice(convertedPrice?.toFixed(4));
      console.log(convertedPrice);
    } catch (error) {
      console.log(error);
    }
    return convertedPrice;
  }

  return (
    <div className="item_root">
      {
        loader && <div>
          <LoaderRotate />
        </div>
      }
      {/* dropdown */}
      {/* <div onClick={() => { test() }} className="item-dropdown dropdown">
                <img alt='profile pic' src={isMenuOpen ? crossIcon : ProfilePic} className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                <div className="dropdown-menu item-dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <div><img className="dropdown-item" alt='Exit' src={Exit}></img></div>
                    <div><img className="dropdown-item" alt='Like' src={Like}></img></div>
                    <div><img className="dropdown-item" alt='Menu' src={Menu}></img></div>
                </div>
            </div> */}

      <div className="item-dropdown d-flex flex-column item-dropdown-menu">
        <div
          onClick={() => {
            setAmendmentPage(false);
          }}
        >
          <img alt="profile pic" src={crossIcon} />
        </div>
        <div>
          <img className="dropdown-item" alt="Exit" src={Exit}></img>
        </div>
        <div>
          <img className="dropdown-item" alt="Like" src={Like}></img>
        </div>
        <div>
          <img className="dropdown-item" alt="Menu" src={Menu}></img>
        </div>
      </div>

      <div className="item_container d-flex p-5 mx-5">
        <div className="item_image-container w-50 p-2">
          <div className="item-image-label d-flex ">
            <p>ETH</p>
            <p>AMENDABLE</p>
          </div>

          <img className="w-100" src={amendNFTData?.image} alt="item" />

          <div className="item-drop-right d-flex">
            <div>
              <img alt="Exit" src={Exit}></img>
            </div>
            <div>
              <img alt="Like" src={Like}></img>
            </div>
            <div>
              <img alt="Menu" src={Menu}></img>
            </div>
          </div>
        </div>
        <div className="item_details d-flex flex-column m-2 p-2 text-left">
          {/* Item Heading Container */}
          <div className="item-heading-container d-flex flex-column w-100">
            <div className="item_heading">
              <h1>{amendNFTData?.name}</h1>
            </div>
            <div className="item_heading-footer d-flex">
              <p className="item_heading-footer_ETH">{amendNFTData?.price} ETH</p>
              {/* <p className="item_heading-footer_dollar">$4429.87</p> */}
              <p className="item_heading-footer_dollar">${dollarPrice}</p>
              <p className="item_heading-footer_stocks">10 in stock</p>
            </div>
          </div>

          {/* Description */}
          {!amendmentPage && (
            <div className="item-description">
              {amendNFTData?.description}
            </div>
          )}

          {/*Sub Header */}
          {!amendmentPage && !isPurchased && (
            <div className="item-subheader d-flex align-items-center">
              <p className="item-subheader_active">Info</p>
              <p className="item-subheader_inactive">Owners</p>
              <p className="item-subheader_inactive">History</p>
              <p className="item-subheader_inactive">Bids</p>
            </div>
          )}

          {!amendmentPage && isPurchased && (
            <div className="item-subheader d-flex align-items-center">
              <p className="item-subheader_active">Info</p>
              <p className="item-subheader_inactive">Owners</p>
              <p className="item-subheader_inactive">Amendment History</p>
            </div>
          )}

          {/*Profile Rows */}
          <div className="item-row-profile d-flex align-items-center mt-4">
            <div className="item-row-image pr-3">
              <img
                style={{ position: "absolute", margin: "28px" }}
                className="badge-icon"
                src={onlineIcon}
                alt="Profile Pic"
              />
              <img src={ProfilePic} alt="Profile Pic" />
            </div>
            <div className="item-row-details d-flex flex-column">
              <p className="item-row-details-position p-0 m-0">Owner</p>
              <p className="item-row-details-name p-0 m-0 ">
                {/* {!isPurchased ? "Raquel Will" : "Collector Guy"} */}
                {amendNFTData?.owner}
              </p>
            </div>
          </div>

          {/* Card */}
          {!amendmentPage && !isPurchased && (
            <div className="item-amendment-details">
              <div className="item-row-profile d-flex align-items-center mt-4">
                <div className="item-row-image pr-3">
                  <img src={profilePic2} alt="Profile Pic" />
                </div>
                <div className="item-row-details d-flex flex-column">
                  <p className="item-row-details-position p-0 m-0">Amender</p>
                  <p className="item-row-details-name p-0 m-0 ">
                    Selina Mayert
                  </p>
                </div>
              </div>

              <div className="item-card-container p-4 my-2">
                <div className="item-card-header d-flex align-items-center">
                  <div className="item-card-image">
                    <img src={profilePic2} alt="Profile Pic" />
                  </div>
                  <div className="item-card-details d-flex flex-column pl-3">
                    <div className="item-card-name d-flex">
                      <p className="m-0 p-0">name</p>
                      <span>user123</span>
                    </div>
                    <div className="item-card-price d-flex gap-2">
                      <p className="item-card-price-ETH m-0 p-0">1.46 ETH</p>
                      <p className="item-card-price-dollar m-0 p-0">$2764.89</p>
                    </div>
                  </div>
                </div>

                <div className="item-card-buttons d-flex w-100 my-4">
                  <button className="item-card-buttons-purchase w-50">
                    Purchase Now
                  </button>
                  <button className="item-card-buttons-bid w-50">
                    Place a bid
                  </button>
                </div>

                <div className="item-card-footer d-flex">
                  <div className="item-card-footer-service-fees d-flex">
                    <label htmlFor="serviceFee">Service Fee</label>
                    <p>1.5%</p>
                  </div>

                  <div>
                    <p className="item-card-footer-fees">2.563 ETH</p>
                  </div>

                  <div>
                    <p className="item-card-footer-fees">$4540.62</p>
                  </div>
                </div>
              </div>

              <div className="item-card-nft-button">
                <button
                  onClick={(e) => {
                    amendmentCLick(e);
                  }}
                  className="w-100"
                >
                  Amend NFT
                </button>
              </div>
            </div>
          )}

          {/* Purchased */}
          {!amendmentPage && isPurchased && (
            <div className="item-amendment-details">
              <div className="item-row-profile d-flex align-items-center mt-4">
                <div className="item-row-image pr-3">
                  <img src={profilePic2} alt="Profile Pic" />
                </div>
                <div className="item-row-details d-flex flex-column">
                  <p className="item-row-details-position p-0 m-0">Creator</p>
                  <p className="item-row-details-name p-0 m-0 ">{amendNFTData?.songData?.songArtist}</p>
                </div>
              </div>

              <div className="item-card-container p-4 my-2">
                <div className="item-card-header d-flex align-items-center">
                  <div className="item-card-image">
                    <img src={profilePic2} alt="Profile Pic" />
                  </div>
                  <div className="item-card-details d-flex flex-column pl-3">
                    <div className="item-card-name d-flex">
                      <p className="m-0 p-0">Highest Bid By</p>
                      <span>Collector Guy</span>
                    </div>
                    <div className="item-card-price d-flex gap-2">
                      <p className="item-card-price-ETH m-0 p-0">1.46 ETH</p>
                      <p className="item-card-price-dollar m-0 p-0">$2764.89</p>
                    </div>
                  </div>
                </div>

                <div className="item-card-buttons d-flex w-100 mt-4">
                  <button className="item-card-buttons-bid w-50">
                    View All
                  </button>
                  <button className="item-card-buttons-purchase w-50">
                    Accept
                  </button>
                </div>

                {/* <div className="item-card-footer d-flex">
                                    <div className="item-card-footer-service-fees d-flex">
                                        <label htmlFor="serviceFee">Service Fee</label>
                                        <p>1.5%</p>
                                    </div>

                                    <div>
                                        <p className="item-card-footer-fees">2.563 ETH</p>
                                    </div>

                                    <div>
                                        <p className="item-card-footer-fees">$4540.62</p>
                                    </div>
                                </div> */}
              </div>

              <div className="item-card-nft-button">
                <button
                  onClick={(e) => {
                    amendmentCLick(e);
                  }}
                  className="w-100"
                >
                  Amend NFT
                </button>
              </div>
            </div>
          )}

          {/* Amendement Form */}
          {amendmentPage && (
            <div className="item-amendement-form-container">
              <form
                onSubmit={(e) => {
                  submitAmendment(e);
                }}
                className="item-amendement-form d-flex flex-column "
              >
                <div className="d-flex flex-column text-column">
                  <label htmlFor="Name">Name of amendment</label>
                  <input
                    placeholder="input name of amendment"
                    name="name"
                    defaultValue={sendAmendNFTData?.name}
                    onChange={handleChange}
                    type="text"
                    id="Name"
                    className="text-white"
                  ></input>
                </div>

                <div className="d-flex flex-column text-column">
                  <label htmlFor="Description">Description</label>
                  <input
                    placeholder="input description of amendment"
                    name="description"
                    onChange={handleChange}
                    defaultValue={sendAmendNFTData?.description}
                    type="text"
                    className="text-white"
                    id="Description"
                  />
                </div>

                <div className="d-flex flex-column file-column">
                  <label>Upload all amendment files</label>
                  <span>
                    Drag or click on upload icon; MP3, WAV, PDF, or .TXT files
                    accepted
                  </span>
                  <label
                    htmlFor="uploadFile"
                    className="item-amendement-file-upload-section w-100 my-2"
                    style={{ cursor: 'pointer' }}
                  >
                    <img src={FileUpload} alt="Upload File" />
                    <p>.WAV or .MP3 Max 1Gb</p>
                  </label>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="uploadFile"
                    onChange={onChange}
                  />
                  <button
                    // disabled={
                    //   !amendent.name ||
                    //   !amendent.description ||
                    //   !amendent.imageUrl
                    // }
                    data-toggle="modal"
                    data-target="#submitAmendment"
                    type="submit"
                    className="item-amendment-submit-btn w-100 mt-4"
                  >
                    Submit
                  </button>

                  <div
                    className="modal fade submit-amendemnt-modal-conatiner"
                    id="submitAmendment"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="submitAmendmentLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="submitAmendmentLabel">
                            {modalHeading}
                          </h5>
                          <button
                            onClick={() => {
                              setisModalOpen(!isModalOpen);
                            }}
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <AmendSubmit
                            isModalOpen={isModalOpen}
                            changeModalHeading={changeModalHeading}
                            amendentData={amendent}
                            data={amendNFTData}
                          />
                        </div>
                        {/* <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                    <button type="button" className="btn btn-primary">Save changes</button>
                                                </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
