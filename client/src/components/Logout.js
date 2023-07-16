import React, { useEffect,useContext } from 'react';
import { useNavigate  } from 'react-router-dom';
import { UserContext } from '../App';

 const Logout =()=>{

    //using promise 
    const {state,dispatch} = useContext(UserContext);

    const navigate=useNavigate();
    useEffect(()=>{
        fetch('https://exam-portal-app.onrender.com/logout',{
            method:'GET',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            credentials:'include'
        }).then((res)=>{
            dispatch({type:'USER',payload:true});
            navigate('/login');
            if(!res.status===200){
                const error = new Error(res.error);
                throw error;
            }
        }).catch((err)=>{
            console.log(err);
        })
    })
    return (
        <>
            <h1> Logout ka page </h1>
        </>
    )
 }
 export default Logout;