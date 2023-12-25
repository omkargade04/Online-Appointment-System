import {Form, Input, Button} from 'antd';
import React from 'react'
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios"
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { showLoading, hideLoading } from '../redux/alertsSlice';

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async(values) => {
       try{
        dispatch(showLoading());
        const response = await axios.post('http://localhost:5000/api/user/register', values);
        dispatch(hideLoading());
        if(response.data.success){
            toast.success(response.data.message);
            toast("Redirecting to login page");
            navigate('/login');
        }else{
            toast.error(response.data.message);
        }
        console.log(values);
       }catch(error){
        dispatch(hideLoading());
        toast.error("Something went wrong");
       }
    };

  return (
    <div className = "authentication">
        <div className='authentication-form card p-3'>
            <h1 className='card-title'>Welcome</h1>

            <Form layout='vertical' onFinish={onFinish}>
                <Form.Item label='Name' name='name'>
                    <Input placeholder='Name'/>
                </Form.Item>

                <Form.Item label='Email' name='email'>
                    <Input placeholder='Email'/>
                </Form.Item>

                <Form.Item label='Password' name='password'>
                    <Input placeholder='Password' type='password'/>
                </Form.Item>

                <Button className='primary-button my-3 full-width-button ' htmlType='submit'> REGISTER</Button>

                <Link to='/login' className='anchor mt-2'>Click here to login</Link>
            </Form>
        </div>
    </div>
  )
}

export default Register