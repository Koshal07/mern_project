import React,{useContext, useState} from 'react';
import { NavLink,useNavigate  } from 'react-router-dom';
// import Loginform from './Loginform';

import { UserContext } from '../App';

const Login = ()=>{

    const {state,dispatch}= useContext(UserContext);

    const navigate=useNavigate();
    
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const loginUser = async (e) => {
        e.preventDefault();

        const res = await fetch('https://mock-exam-portalll-backend.onrender.com/signin',{
            method:'POST',
            headers:{
            'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email,
                password
            })

           
        });
        const data=res.json();
        if(res.status===400 || !data)
        {
            window.alert('INVALID CREDENTIALS')
        }else{
            dispatch({type:'USER',payload:true});
            window.alert('LOGIN SUCCESSFULL');
            navigate('/mock');
        }
    }

    return (
        <>
            <section className='sign-in'>
            <h2 className='form-title'>Sign Up</h2>
                <div className='container mt-5'>
                {/* <h2 className='form-title'>Sign Up</h2> */}
                    <div className='signin-content'>
                        {/* <h2 className='form-title'>Sign Up</h2> */}
                        {/* <Loginform /> */}

                        <form method='POST' className='register-form' id='register-form'>
                            

                            <div className='form-group'>
                                <label htmlFor='email'>
                                <i class="zmdi zmdi-email material-icons-name"></i>
                                </label>
                                <input type='email' name='email' id='email' autoComplete='off' 
                                value={email}
                                onChange={(e)=> setEmail(e.target.value)}
                                placeholder='Your Email' />
                            </div>

                            

                        

                            <div className='form-group'>
                                <label htmlFor='password'>
                                <i class="zmdi zmdi-lock material-icons-name"></i>
                                </label>
                                <input type='password' name='password' id='password' autoComplete='off' 
                                value={password}
                                onChange={(e)=> setPassword(e.target.value)}
                                placeholder='Your Password' />
                            </div>

                      

                            <div className='form-group form-button'>
                                <input type='submit' name='signin' id='signin' className='form-submit' 
                                value='Log In'
                                onClick={loginUser}
                                 />
                            </div>
                            <NavLink to='/signup' className='signup-image-link'>Create an account</NavLink>
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
export default Login;