import React from 'react'
import './Loader.css'
import { ImSpinner9 } from 'react-icons/im'
export default function Loader() {
    return (
        <div className='d-flex justify-content-center align-items-center w-100 main-loader'>
            <ImSpinner9 color='black' size={'5rem'} />
        </div>
    )
}
