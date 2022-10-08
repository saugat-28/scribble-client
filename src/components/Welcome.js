import React from 'react'
import icon from '../images/scribble-icon.png'

const Welcome = () => {
    return (
        <div className='container'>
            <div className='d-flex'>
                <div className='text-center mt-5'>
                    <img src={icon} height={300} width={300} alt="Scribble-Icon"/>
                    <h1><b>Scribble</b></h1>
                    <h3><b>A Secure Notebook on the Cloud</b></h3>
                </div>
                <div>
                    <b>Please Login To Continue</b>
                </div>
            </div>

        </div>
    )
}

export default Welcome