import React,{useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Signup = ()=>{
    const navigate=useNavigate();
    const [user,setUser]=useState({
        name:'',
        email:'',
        phone:'',
        work:'',
        password:'',
        cpassword:''
    });
    let name,value;
    const handleInput=(e)=>{
        console.log(e);
        name=e.target.name;
        value=e.target.value;
        setUser({...user,[name]:value});
    }

    const PostData = async(e)=>{
        e.preventDefault();
        const {name,email,phone,work,password,cpassword}=user;
        const res=await fetch('https://exam-portal-app.onrender.com/register',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name,email,phone,work,password,cpassword
            })
        });
        const data=await res.json();
        if(data.status ===  422 || !data){
            window.alert('INVALID REGISTRATION');
            console.log('INVALID REGISTRATION');
        }else{
            window.alert('REGISTRATION SUCCESSFULL');
            console.log('REGISTRATION SUCCESSFULL');
            navigate('/login');
        }
    }

    return (
        <>
            <section className='signup'>
            <h2 className='form-title'>Sign Up</h2>
                <div className='container mt-5'>
                {/* <h2 className='form-title'>Sign Up</h2> */}
                    <div className='signup-content'>
                        {/* <h2 className='form-title'>Sign Up</h2> */}
                        <form method='POST' className='register-form' id='register-form'>
                            <div className='form-group'>
                                <label htmlFor='name'>
                                <i class="zmdi zmdi-account material-icons-name"></i>
                                </label>
                                <input type='text' name='name' id='name' autoComplete='off'
                                value={user.name}
                                onChange={handleInput}
                                 placeholder='Your Name' />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='email'>
                                <i class="zmdi zmdi-email material-icons-name"></i>
                                </label>
                                <input type='email' name='email' id='email' autoComplete='off'
                                value={user.email}
                                onChange={handleInput}

                                placeholder='Your Email' />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='phone'>
                                <i class="zmdi zmdi-phone-in-talk material-icons-name"></i>
                                </label>
                                <input type='number' name='phone' id='phone' autoComplete='off'
                                value={user.phone}
                                onChange={handleInput}

                                placeholder='Your Phone No.' />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='work'>
                                <i class="zmdi zmdi-slideshow material-icons-name"></i>
                                </label>
                                <input type='text' name='work' id='work' autoComplete='off'
                                value={user.work}
                                onChange={handleInput}

                                placeholder='Your Profession' />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='password'>
                                <i class="zmdi zmdi-lock material-icons-name"></i>
                                </label>
                                <input type='password' name='password' id='password' autoComplete='off'
                                value={user.password}
                                onChange={handleInput}

                                placeholder='Your Password' />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='cpassword'>
                                <i class="zmdi zmdi-lock material-icons-name"></i>
                                </label>
                                <input type='password' name='cpassword' id='cpassword' autoComplete='off'
                                value={user.cpassword}
                                onChange={handleInput}

                                placeholder='Confirm Your Password' />
                            </div>

                            <div className='form-group form-button'>
                                <input type='submit' name='signup' id='signup' className='form-submit' value='register' onClick={PostData} />
                            </div>
                            <NavLink to='/login' className='signup-image-link'>I m already register</NavLink>
                        </form>
                    </div>
                        <div className='signup-image'>
                            <figure>
                                {/* <img src={signpic} alt="registration pic" /> */}
                            </figure>
                            {/* <NavLink to='/login' className='signup-image-link'>I m already register</NavLink> */}
                        </div>
                    
                </div>
            </section>
        </>
    )
}
export default Signup;