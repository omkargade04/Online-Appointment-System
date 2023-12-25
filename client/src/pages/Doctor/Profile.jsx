import Layout  from "../../components/Layout"
import {useNavigate, useParams} from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { showLoading, hideLoading } from '../../redux/alertsSlice';
import DoctorForm from "../../components/DoctorForm";
import moment from 'moment';

function Profile() {
    const {user} = useSelector(state => state.user);
    const params = useParams();
    const [doctor, setDoctor] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async(values) => {
        try{
            dispatch(showLoading());
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/doctor/update-doctor-profile`, {
                ...values,
                userId: user._id,
                timings: [
                    moment(values.timings[0]).format("HH:mm"),
                    moment(values.timings[1]).format("HH:mm"),
                ],
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
            dispatch(hideLoading());
            if(response.data.success){
                toast.success(response.data.message);
                //console.log(response.data.data);
            }else{
                toast.error(response.data.message);
            }
            console.log(values);
           }catch(error){
            dispatch(hideLoading());
            toast.error("Something went wrong");
           }
    };

    const getDoctorData = async() => {
        //console.log(doctor);
        try{
            dispatch(showLoading())
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/doctor/get-doctor-info-by-user-id/${user._id}`, 
            {

                headers: {
                    Authorization : `Bearer ${localStorage.getItem("token")}`,
                },
            });
            console.log(doctor);
            dispatch(hideLoading());
            if(response.data.success){
                setDoctor(response.data.data);
            }
            console.log(doctor);
        }catch(error){
            dispatch(hideLoading());
        }
    };
    useEffect(() => {      
        getDoctorData();
    },[])

  return (
    <Layout>
        <h1 className="page-title">Doctor Profile</h1>
        <hr />
        {doctor && <DoctorForm onFinish={onFinish} initialValues={doctor}/>}
        {/* <DoctorForm onFinish={onFinish} initialValues={doctor}/> */}
    </Layout>
  )
}

export default Profile