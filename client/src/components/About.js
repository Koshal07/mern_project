import React, { useEffect,useState } from 'react';
import koshalpic from '../images/koshalpic.jpg';
import aboutpic from '../images/about.png';
import { useNavigate  } from 'react-router-dom';

const About = ()=>{


    const navigate=useNavigate();

    const [userData,setUserData]=useState({});

    const callAboutPage = async () =>{
        // console.log(res);
        try{
            const res = await fetch('https://mock-exam-portalll-backend.onrender.com/about',{
                method:'GET',
                
                mode: 'cors',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json'
                },
                credentials:'include'
            });
            console.log(res);
            const data = await res.json();
            console.log(data);
            console.log(data);
            setUserData(data);

            if(!res.status===200){
                const error = new Error(res.error);
                throw error;
            }

        }catch(err){
            console.log(err);
            navigate('/login'); //if user is not authenicate then show login page
        }


    }

     useEffect(()=>{
        callAboutPage();
     },[]);

    return (
        <>
           <div className='container emp-profile'>
                <form method='GET'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <img height='150' width='150' src={userData.name==='Koshal Singh' ? koshalpic : aboutpic} alt="Profile Pic" />
                        </div>
                        <div className='col-md-6'>
                            <div className='profile-head'>
                                <h5>{userData.name}</h5>
                                <h6>{userData.work}</h6>
                                {/* <p className='profile-rating mt-3 mb-5'>RANKING : <span> 1/10</span></p> */}


                                <ul className="nav nav-tabs" role='tablist'>
                                    <li className="nav-item">
                                        <a className="nav-link active" data-toggle='tab' aria-current="page" id='home-tab' role='tab' href="#home">About</a>
                                    </li>
                                    {/* <li className="nav-item">
                                        <a className="nav-link active" data-toggle='tab' aria-current="page" id='profile-tab' role='tab' href="#profile">TimeLine</a>
                                    </li> */}
                                </ul>


                            </div>
                        </div>
                        
                    
                        {/* <div className='col-md-2'>
                        <input type='submit' className='profile-edit-btn' name='btnAddMore' value='Edit Profile' />

                        </div> */}
                    </div>
                    <div className='row'>
                        <div className='col-md-4'>
                            <div className='profile-work'>
                                <p> Work Link</p>
                                <a href='https://www.linkedin.com/in/koshal-singh-770116214/' target='_koshal'>LinkedIn</a><br />
                                <a href='https://github.com/Koshal07' target='_koshal'>GitHub</a><br />
                            </div>
                        </div>
                        
                        
                            <div className='col-md-8 pl-5 about-info'>
                                <div className='tab-content profile-tab' id='myTabContent'>
                                    <div className='tab-pane fade show active' id='home' role='tabpanel' aria-aria-labelledby='home-tab'>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <p>User ID</p>
                                            </div>
                                            <div className='col-md-6'>
                                                <p>{userData._id}</p>
                                            </div>
                                        </div>

                                        <div className='row mt-3'>
                                            <div className='col-md-6'>
                                                <p>Name</p>
                                            </div>
                                            <div className='col-md-6'>
                                                <p>{userData.name}</p>
                                            </div>
                                        </div>
                                        <div className='row mt-3'>
                                            <div className='col-md-6'>
                                                <p>Email</p>
                                            </div>
                                            <div className='col-md-6'>
                                                <p>{userData.email}</p>
                                            </div>
                                        </div>
                                        <div className='row mt-3'>
                                            <div className='col-md-6'>
                                                <p>Phone</p>
                                            </div>
                                            <div className='col-md-6'>
                                                <p>{userData.phone}</p>
                                            </div>
                                        </div>
                                        <div className='row mt-3'>
                                            <div className='col-md-6'>
                                                <p>Profession</p>
                                            </div>
                                            <div className='col-md-6'>
                                                <p>{userData.work}</p>
                                            </div>
                                        </div>  
                                    </div>
                                    {/* paste */}


                                    <div className='tab-pane fade' id='profile' role='tabpanel' aria-aria-labelledby='profile-tab'>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <p>User ID</p>
                                            </div>
                                            <div className='col-md-6'>
                                                <p>123456789</p>
                                            </div>
                                        </div>

                                        <div className='row mt-3'>
                                            <div className='col-md-6'>
                                                <p>Name</p>
                                            </div>
                                            <div className='col-md-6'>
                                                <p>Koshal</p>
                                            </div>
                                        </div>
                                        <div className='row mt-3'>
                                            <div className='col-md-6'>
                                                <p>Email</p>
                                            </div>
                                            <div className='col-md-6'>
                                                <p>koshalsingh1022@gmail.com</p>
                                            </div>
                                        </div>
                                        <div className='row mt-3'>
                                            <div className='col-md-6'>
                                                <p>Phone</p>
                                            </div>
                                            <div className='col-md-6'>
                                                <p>8920354925</p>
                                            </div>
                                        </div>
                                        <div className='row mt-3'>
                                            <div className='col-md-6'>
                                                <p>Profession</p>
                                            </div>
                                            <div className='col-md-6'>
                                                <p>Web Developer</p>
                                            </div>
                                        </div>  
                                    </div>



                                    
                                </div>
                                

                            </div>
                           
                    </div>
                </form>
           </div>
        </>
    )
}
export default About;