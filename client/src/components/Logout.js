import React, { useEffect,useContext } from 'react';
import { useNavigate  } from 'react-router-dom';
import { UserContext } from '../App';

 const Logout =()=>{

    //using promise 
    const {state,dispatch} = useContext(UserContext);

    const navigate=useNavigate();
    useEffect(()=>{
        fetch('https://mock-exam-portalll-backend.onrender.com/logout',{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            credentials:'include'
        }).then((res)=>{
            dispatch({type:'USER',payload:false});
            navigate('/login');
            if(!res.status===200){
                const error = new Error(res.error);
                throw error;
            }
        }).catch((err)=>{
            console.log(err);
        })
    });
    return (
        <>
            <h1> Logout ka page </h1>
        </>
    )
 }
 export default Logout;