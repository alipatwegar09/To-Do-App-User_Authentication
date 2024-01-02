import React, { useEffect, useState } from 'react'
import { login } from '../services/api.js'
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './partials/Header.jsx';

function Login() {
  const navigation=useNavigate()
    const [form, setForm]=useState({
        username:"",
        password:"",
    });


    useEffect(()=>{
      const user=localStorage.getItem('user')
      if(user){
        return navigation('/')
      }
    },[])
    

    const [errors, setErrors]=useState(null)

    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }

    const handleSubmit =async ()=>{
        
        const result= await login(form);
        console.log("form",result)
        setErrors(null)
       
        if(result.status===200){
          if(result.data.status ===200){
            localStorage.setItem('user',JSON.stringify(result.data.data))
            navigation('/')
            return;
          }
        }

        if(result.data.status=== 201){
          setErrors(result.data.data)
          return;
        }

        if(result.data.status===202){
          toast(result.data.message)
          return;
        }
    }
  return (
    <><Header/>
    
    <div className='container'>
      <ToastContainer/>
      <div className='row justify-content-center mt4'>
        <div className="col-lg-5 card border-primary mt-4">
    <div className="card-body">
    <div className='card-header h4 text-center'>
            Login Now
          </div>
      <div className="form-group">
  <label htmlFor="exampleInputEmail1" className="form-label mt-4">
    Username
  </label>
  <input
    type="text"
    onChange={handleChange}
    name="username"
    className="form-control"
    id="exampleInputEmail1"
    aria-describedby="emailHelp"
    placeholder="Enter username"
  />
  {
    errors?.username &&   <small id="emailHelp" className="form-text text-muted">
    {errors.username.msg}
  </small>
  }


  <div className="form-group">
  <label htmlFor="exampleInputEmail1" className="form-label mt-4">
    Password
  </label>
  <input
    type="password"
    onChange={handleChange}
    name="password"
    className="form-control"
    id="exampleInputEmail1"
    aria-describedby="emailHelp"
    placeholder="Enter password"
  />
  {
    errors?.password &&   <small id="emailHelp" className="form-text text-muted">
    {errors.password.msg}
  </small>
  }
</div>
</div>
<div className="row justify-content-md-center form-group mt-4">
<button type="button" onClick={handleSubmit} className='col-sm-4 btn btn-outline-secondary center'>Login</button>
</div>
    </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login
