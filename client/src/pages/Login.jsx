import {Form, Input, Button} from 'antd';
import React from 'react'
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios"
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { showLoading, hideLoading } from '../redux/alertsSlice';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async(values) => {
    try{
         dispatch(showLoading());
         const response = await axios.post("http://localhost:5000/api/user/login", values);
         dispatch(hideLoading());
         if(response.data.success){
             toast.success(response.data.message);
             toast("Redirecting to home page");
             localStorage.setItem("token", response.data.data);
            navigate('/');
         }else{
             toast.error(response.data.message);
         }
         console.log(values);
        }catch(error){
         toast.error("Something went wrong");
        }
     };

  return (
    <div className = "authentication">
        <div className='authentication-form card p-3'>
            <h1 className='card-title'>Welcome Back</h1>

            <Form layout='vertical' onFinish={onFinish}>

                <Form.Item label='Email' name='email'>
                    <Input placeholder='Email'/>
                </Form.Item>

                <Form.Item label='Password' name='password'>
                    <Input placeholder='Password' type='Password'/>
                </Form.Item>

                <Button className='primary-button my-3 full-width-button' htmlType='submit'> LOGIN</Button>

                <Link to='/register' className='anchor mt-2'>Click here to register</Link>
            </Form>
        </div>
    </div>
  )
}

export default Login