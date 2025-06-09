import React from 'react';
import "../../index.css"
import loader1 from "/loader/loader1.webp";
import loader2 from "/loader/loader2.webp";
import loader3 from "/loader/loader3.webp";
import loader4 from "/loader/loader4.webp";
const Loader2 = () => {
    return (
        <div className='loader2-container'>
            <div className='loader text-center'>
                <div className="loader1 absolute">
                    <img src={loader1} alt="loader1" />
                </div>
                <div className="loader2 absolute">
                    <img src={loader2} alt="loader2" />
                </div>
                <div className="loader3 absolute">
                    <img src={loader3} alt="loader3" />
                </div>
                <div className="loader4 absolute">
                    <img src={loader4} alt="loader4" />
                </div>
            </div>
        </div>

    )
}

export default Loader2
