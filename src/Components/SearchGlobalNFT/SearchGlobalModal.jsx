import React, { useEffect, useState } from 'react'
import Image from '../../Assets/globalSearchBG.png'

export default function SearchGlobalModal({ fetchedAmendentData }) {
    const [image, setImage] = useState("");

    const getImageUrl = async (tokenURI) => {
        // let CID = tokenURI?.split("//")[1]?.split("/")[0];
        // let CID1 = tokenURI?.split("//")[1]?.split("/")[1];
        // let image;
        // if (CID && CID1) {
        //     image = `https://${CID}.ipfs.nftstorage.link/${CID1}`
        // }
        let image = String(tokenURI).replace('ipfs://', 'https://ipfs.io/ipfs/')
        return image
    }
    useEffect(() => {
        console.log(fetchedAmendentData);
        if (!String(fetchedAmendentData?.image).includes('http')) {
            getImageUrl(fetchedAmendentData?.image).then((img) => {
                console.log(img);
                setImage(img)
            })
        } else {
            setImage(fetchedAmendentData?.image)
        }
    }, [fetchedAmendentData])

    return (
        <div className='d-flex w-100 flex-wrap global-search-nft-modal-container'>

            <div className='w-50 d-flex align-items-center justify-content-center px-2'>
                <img src={image} alt="" />
            </div>

            <div className='w-50'>

                <div>
                    <label>Name :</label>
                    <h5>{fetchedAmendentData?.name}</h5>
                </div>

                <div>
                    <label>Description :</label>
                    <p>{fetchedAmendentData?.description}</p>
                </div>

            </div>
        </div>
    )
}
