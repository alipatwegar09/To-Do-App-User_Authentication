import React, { useEffect, useState } from 'react';
import { register } from '../services/api.js';
import { ToastContainer, toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'
import Header from './partials/Header.jsx';

function Register() {
  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });

  const [errors,setErrors]=useState(null)

  const navigation=useNavigate();

  useEffect(()=>{
    const user=localStorage.getItem('user')
    if(user){
      return navigation('/')
    }
  },[])

  const handleInputChange = (e) => {
    //const { name, value } = e.target;
    setForm({...form,[e.target.name]:e.target.value})
  };

  const handleSubmit = async() => {
    // You can perform form submission logic here, for example, send data to a server
   // console.log('Form submitted:', form);
    const result=await register(form)
    if(result.status===200){
      if(result.data.status===201){
        setErrors(result.data.data)
        toast(result.data.message)
        return;
      }

      if(result.data.status===200){
        localStorage.setItem('user',JSON.stringify(result.data.data));
        navigation('/')
        return;
      }
      if(result.data.status===202){
        toast(result.data.message)
        return;
        
      }
    }
    else{
      toast("Something went wrong,please tryy again")
    }
  };

  

  return (
    <>
    <Header/>
    <div className='container'>
      <ToastContainer/>
      <div className='row justify-content-md-center mt-4'>
        <div className="col-lg-5 card border-primary mb-3">
          <div className='card-header h4 text-center'>
            Register An Account
          </div>

          <div className="card-body">
            <div className="form-group">
              <label className='col-form-label mt-2'>Name</label>
              <input
                type='text'
                className='form-control'
                placeholder='Enter your name'
                name='name'
                value={form.name}
                onChange={handleInputChange}
              />
               {
    errors?.name &&   <small id="emailHelp" className="form-text text-danger">
    {errors.name.msg}
  </small>
  }
            </div>

            <div className="form-group">
              <label className='col-form-label mt-3'>Username</label>
              <input
                type='text'
                className='form-control'
                placeholder='Enter Username'
                name='username'
                value={form.username}
                onChange={handleInputChange}
              />

{
    errors?.username &&   <small id="emailHelp" className="form-text text-danger">
    {errors.username.msg}
  </small>
  }
            </div>

            <div className="form-group">
              <label className='col-form-label mt-3'>Email</label>
              <input
                type='email'
                className='form-control'
                placeholder='Enter Email'
                name='email'
                value={form.email}
                onChange={handleInputChange}
              />
               {
    errors?.email &&   <small id="emailHelp" className="form-text text-danger">
    {errors.email.msg}
  </small>
  }
            </div>

            <div className="form-group">
              <label className='col-form-label mt-3'>Password</label>
              <input
                type="password"
                className='form-control'
                placeholder='Enter password'
                name='password'
                value={form.password}
                onChange={handleInputChange}
              />
               {
    errors?.password &&   <small id="emailHelp" className="form-text text-danger">
    {errors.password.msg}
  </small>
  }
            </div>

            <div className="row justify-content-md-center form-group mt-3">
              <button
                type="button"
                className='col-sm-6 btn btn-outline-secondary center'
                onClick={handleSubmit}
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Register;
