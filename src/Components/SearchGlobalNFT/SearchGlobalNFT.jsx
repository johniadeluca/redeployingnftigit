import React, { useState } from 'react'
import './SearchGlobalNFT.css'
import BGICon from '../../Assets/globalSearchBG.png'
import InputIcon from '../../Assets/inputIcon.png'
import CardIcon1 from '../../Assets/card-icon-1.png'
import SearchGlobalModal from './SearchGlobalModal'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import axios from 'axios'
import SubmitForm from '../SubmitForm'
import { errorMessage, successMessage, warningMessage } from '../../Utils/Messages'

export default function SearchGlobalNFT() {

    const [networkName, setNetworkName] = useState("");
    const [contactAddress, setContactAddress] = useState("");
    const [tokenId, setTokenId] = useState();
    const [loading, setLoading] = useState(false);
    const [IPFS, setIPFS] = useState("")
    const [fetchedData, setFetchedData] = useState({});
    const [imageBase64, setImageBase64] = useState("");

    const submitDetails = (e) => {
        console.log(networkName, contactAddress, tokenId);
        setLoading(true)
        axios.post('https://nfti-app.herokuapp.com/getGlobalNFT', {
            network: networkName,
            contract_address: contactAddress,
            token_id: tokenId,
        }, {
            headers: {
                "Access-Control-Allow-Origin": '*'
            }
        }).then((res) => {
            console.log(res);
            if (res.data.status === 200) {
                setIPFS(res?.data?.IpfsUrl)
                setFetchedData(res?.data?.data)
                successMessage(res?.data?.response)
                setImageBase64(res?.data?.image_base)
            } else {
                errorMessage(res?.data?.response)
            }
            setLoading(false)
        }).catch((err) => {
            setLoading(false)
            errorMessage("Some Error Occured")
            console.log(err);
        })
    }

    return (
        <div className='global-search-container d-flex flex-column py-5'>
            <div className='d-flex justify-content-center align-items-center bg-image'>
                <img width={'70%'} height='100%' src={BGICon} alt="" />
            </div>

            <div className='global-search-second-sub d-flex align-items-center flex-column py-3'>
                <h1>Input NFT token address and token id.</h1>

                <p>Enter the Token Address in the first box and then the token id in the second box.</p>

                <div className='global-search-second-sub-input'>
                    <select value={networkName} onChange={(e) => { setIPFS(""); setNetworkName(e.target.value) }} className='w-100 px-3 py-2' name="" id="">
                        <option disabled={true} value="">Select Network</option>
                        {/* <option value="ETH">Ethereum Mainnet</option> */}
                        <option value="Koven">Kovan </option>
                    </select>
                </div>

                {/* <div className='global-search-second-sub-input d-flex align-items-center justify-content-center'>
                    <input className='px-3 py-2' type="text" placeholder='Choose Network' />
                    <img src={InputIcon} alt="" />
                </div> */}

                <div className='global-search-second-sub-input d-flex align-items-center justify-content-center'>
                    <input onChange={(e) => { setIPFS(""); setContactAddress(e.target.value) }} className='px-3 py-2' type="text" placeholder='Enter contact address' />
                    {/* <img src={InputIcon} alt="" /> */}
                </div>
                <div className='global-search-second-sub-input d-flex align-items-center justify-content-center'>
                    <input onChange={(e) => { setIPFS(""); setTokenId(e.target.value) }} className='px-3 py-2' type="text" placeholder='Enter Token ID' />
                    <img onClick={(e) => { submitDetails(e) }}
                        // data-toggle="modal" data-target="#globalNFTModal"
                        src={InputIcon} alt="" />
                </div>
            </div>

            {/*  */}
            <div className="modal fade" id="globalNFTModal" tabIndex={-1} role="dialog" aria-labelledby="globalNFTModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="globalNFTModalLabel">NFT Details</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <SearchGlobalModal fetchedAmendentData={fetchedData} />
                            {/* {fetchedData && <SubmitForm fetchedAmendentData={fetchedData} />} */}
                        </div>
                        {/* <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Mint NFT</button>
                        </div> */}
                    </div>
                </div>
            </div>

            <div className="modal fade" id="mintNFTModal" tabIndex={-1} role="dialog" aria-labelledby="mintNFTModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            {/* <h5 className="modal-title" id="mintNFTModalLabel">NFT Details</h5> */}
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {/* <SearchGlobalModal fetchedAmendentData={fetchedData} /> */}
                            {fetchedData && <SubmitForm fetchedAmendentData={fetchedData} imageBase64={imageBase64} />}
                        </div>
                        {/* <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Mint NFT</button>
                        </div> */}
                    </div>
                </div>
            </div>
            {/*  */}

            {
                loading ?
                    <div className="profile-loader">
                        {
                            <AiOutlineLoading3Quarters color="white" size={'2vw'} />
                        }
                    </div> : <>
                        {
                            IPFS.length > 0 && <p className='text-center global-search-fetched-nft-details m-0 p-0'>
                                <span>IPFS: </span>
                                <a target='_blank' href={IPFS}>{IPFS}</a>
                                <br />
                                <button
                                    data-toggle="modal" data-target="#globalNFTModal"
                                    className='mx-2'>View NFT</button>
                                <button
                                    data-toggle="modal" data-target="#mintNFTModal"
                                    className='mx-2'>Mint NFT</button>
                            </p>
                        }
                    </>
            }

            <div className='global-search-third-sub d-flex flex-column align-items-center py-3 w-100'>
                <h5>Explore more</h5>
                <div className='w-100 d-flex justify-content-center'>
                    <div className='global-search-card-container d-flex px-3'>

                        <div className='global-search-card d-flex align-items-center py-2 pl-3'>
                            <div className='global-search-card-img'>
                                <img src={CardIcon1} alt="" />
                            </div>

                            <div className='global-search-card-details d-flex flex-column justify-content-center'>
                                <h5 className='m-0 p-0'>Artwork</h5>
                                <p className='m-0 p-0'>138 items</p>
                            </div>
                        </div>

                        <div className='global-search-card d-flex align-items-center py-2 pl-3'>
                            <div className='global-search-card-img w-25'>
                                <img width={'100%'} src={CardIcon1} alt="" />
                            </div>

                            <div className='global-search-card-details d-flex flex-column justify-content-center'>
                                <h5 className='m-0 p-0'>Artwork</h5>
                                <p className='m-0 p-0'>138 items</p>
                            </div>
                        </div>

                        <div className='global-search-card d-flex align-items-center py-2 pl-3'>
                            <div className='global-search-card-img'>
                                <img src={CardIcon1} alt="" />
                            </div>

                            <div className='global-search-card-details d-flex flex-column justify-content-center'>
                                <h5 className='m-0 p-0'>Artwork</h5>
                                <p className='m-0 p-0'>138 items</p>
                            </div>
                        </div>

                        <div className='global-search-card d-flex align-items-center py-2 pl-3'>
                            <div className='global-search-card-img'>
                                <img src={CardIcon1} alt="" />
                            </div>

                            <div className='global-search-card-details d-flex flex-column justify-content-center'>
                                <h5 className='m-0 p-0'>Artwork</h5>
                                <p className='m-0 p-0'>138 items</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
