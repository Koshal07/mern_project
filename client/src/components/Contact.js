import React,{ useState , useEffect } from 'react';

const Contact = ()=>{

    

   





    const [userData,setUserData]=useState({name:"",email:"",phone:"",message:""});

    const userContact = async () =>{
        try{
            const res = await fetch('https://mock-exam-portalll-backend.onrender.com/getdata',{
                method:'GET',
                headers:{
                    
                    'Content-Type':'application/json'
                },
                credentials:"include"
                
            });

            // const data = await res.json();
            console.log(res);
            setUserData({...userData, name: res.name, email:res.email, phone:res.phone});

            if(!res.status===200){
                const error = new Error(res.error);
                throw error;
            }

        }catch(err){
            console.log(err);
           
        }


    }

     useEffect(()=>{
        userContact();
     },[]);

     // we are storing data in states

     const handleInput =(e)=>{
        const name = e.target.name;
        const value = e.target.value;

        setUserData({...userData,[name]:value })
     }

     //sending data to the backend
     const handleForm = async (e)=>{
        e.preventDefault();

        const {name,email,phone,message}=userData;

        const res = await fetch('https://mock-exam-portalll-backend.onrender.com/contact',{
            method:"GET",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name,email,phone,message
            })
        });

        //const data =await res.json();
        if(!res){
            console.log('Message Not Send');
            alert('Message Not Send');  
        }else{
            console.log('Message Send');
            alert('Message Send');
            setUserData({...userData,message:""});
        }
     }


    return (
        <>
            <div className='contact_info'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-lg-10 offset-lg-1 d-flex justify-content-between'>
                            {/* Phone no */}
                            <div className='contact-info_item d-flex justify-content-start align-items-center'>
                                <img src ="https://img.icons8.com/office/24/000000/iphone.png" alt="phone " />
                                <div className='contact_info_content'>
                                    <div className='contact_info_title'>
                                        Phone
                                    </div>
                                    <div className='contact_info_text'>
                                    +91 8920354925
                                    </div>
                                </div>
                            </div>
                            {/* Email */}
                            <div className='contact-info_item d-flex justify-content-start align-items-center'>
                                <img src ="https://img.icons8.com/office/24/000000/iphone.png" alt="phone " />
                                <div className='contact_info_content'>
                                    <div className='contact_info_title'>
                                        Email
                                    </div>
                                    <div className='contact_info_text'>
                                    koshalsingh1022@gmail.com
                                    </div>
                                </div>
                            </div>
                            {/* Address */}
                            <div className='contact-info_item d-flex justify-content-start align-items-center'>
                                <img src ="https://img.icons8.com/office/24/000000/iphone.png" alt="phone " />
                                <div className='contact_info_content'>
                                    <div className='contact_info_title'>
                                        Address
                                    </div>
                                    <div className='contact_info_text'>
                                    New Delhi,India
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact form */}
            <div className='contact_form'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-10 offset-lg-1'>
                            <div className='contact_form_container py-5'>
                                <div className='contact_form_title'>
                                    Get In touch
                                </div>
                                <form method='POST' id='contact_form'>
                                    <div className='contact_form_name d-flex justify-content-between align-items-between'>
                                        <input type='text' id="contact_form_name"
                                        className='contact_form_name input_field'
                                        name='name'
                                        onChange={handleInput}
                                        value={userData.name}
                                        placeholder='Your Name' required='true' />

                                        <input type='email' id="contact_form_name"
                                        className='contact_form_name input_field'
                                        name='email'
                                        onChange={handleInput}
                                        value={userData.email}
                                        placeholder='Your Email' required='true' />

                                        <input type='number' id="contact_form_name"
                                        className='contact_form_name input_field'
                                        name='phone'
                                        onChange={handleInput}
                                        value={userData.phone}
                                        placeholder='Your Phone Number' required='true' />
                                    </div>

                                    <div className='contact_form_text mt-5'>
                                        <textarea className='text_field contact_form_message' 
                                        name='message'
                                        onChange={handleInput}
                                        value={userData.message}
                                        placeholder='Message'
                                        cols='30' rows='10'></textarea>
                                    </div>
                                    <div className='contact_form_button'>
                                        <button onClick={handleForm} type='submit' className='button contact_button_submit'>
                                            Send Message
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Contact;