import React from 'react';
import { NavLink } from 'react-router-dom';
const Errorpage =()=>{
    return (
        <>
            <div id='notfound'>
                <div className='notfound'>
                    <div className='notfound-404'>
                        <h1>404</h1>
                    </div>
                    <h2>We are Sorry, page not found!</h2>
                    <p className='mb-5'>
                        THE PAGE YOU ARE LOOKINF FOR MIGHT HAVE BEEN REMOVED HAD ITS NAME CHANGED OR TEMPORARLY UNAVAILABLE
                    </p>
                    <NavLink to='/'> Back to Home Page</NavLink>
                </div>
            </div>
        </>
    )
}
export default Errorpage;