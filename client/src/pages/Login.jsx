import { Form, Input, Button } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { showLoading, hideLoading } from "../redux/alertsSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/user/login`,
        values
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redirecting to home page");
        localStorage.setItem("token", response.data.data);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
      console.log(values);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="login-page flex w-full ">
        <div className="login-page-image bg-white flex justify-center items-center mt-20 object-cover ">
            <img className='' src="https://img.freepik.com/premium-vector/personal-doctor-appointment-2d-vector-isolated-illustration-visit-professional-health-facility-flat-characters-cartoon-background-getting-treatment-plan-symptoms-conditions-colourful-scene_151150-5797.jpg?w=2000" alt="" />
     </div>
        <div className = "authentication bg-blue-400">
        <div className='authentication-form card p-3'>
            <h1 className='card-title bg-blue-500'>Welcome Back</h1>

            <Form layout='vertical' onFinish={onFinish}>

                <Form.Item label='Email' name='email'>
                    <Input placeholder='Email'/>
                </Form.Item>

                <Form.Item label='Password' name='password'>
                    <Input placeholder='Password' type='Password'/>
                </Form.Item>

                <Button className='bg-blue-500 primary-button my-3 full-width-button' htmlType='submit'> LOGIN</Button>

                <Link to='/register' className='anchor mt-2'>Click here to register</Link>
            </Form>
        </div>
    </div>

    </div>

    // <div className="login-page  md:flex items-center justify-center h-screen bg-gray-100">
    //   <div
    //     className="login-page-image sm:hidden w-full md:w-1/2 lg:w-1/3 object-cover bg-cover bg-center"
    //     style={{
    //       backgroundImage: `url(https://img.freepik.com/premium-vector/personal-doctor-appointment-2d-vector-isolated-illustration-visit-professional-health-facility-flat-characters-cartoon-background-getting-treatment-plan-symptoms-conditions-colourful-scene_151150-5797.jpg?w=2000)`,
    //     }}
    //   ></div>

    //   <div className="authentication bg-blue-400 w-full md:w-1/2 lg:w-1/3 rounded-lg p-4 md:p-6">
    //     <div className="authentication-form">
    //       <h1 className="card-title text-2xl font-bold text-white mb-4">
    //         Welcome Back
    //       </h1>

    //       <Form layout="vertical" onFinish={onFinish}>
    //         <Form.Item label="Email" name="email">
    //           <Input placeholder="Email" />
    //         </Form.Item>

    //         <Form.Item label="Password" name="password">
    //           <Input placeholder="Password" type="Password" />
    //         </Form.Item>

    //         <Button
    //           className="bg-blue-500 text-white px-4 py-2 rounded-md my-3 w-full"
    //           htmlType="submit"
    //         >
    //           LOGIN
    //         </Button>

    //         <Link
    //           to="/register"
    //           className="anchor mt-2 text-blue-500 hover:underline"
    //         >
    //           Click here to register
    //         </Link>
    //       </Form>
    //     </div>
    //   </div>
    // </div>
  );
}

export default Login;
