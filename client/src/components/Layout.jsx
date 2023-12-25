import React from 'react'
import "../layout.css"
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';
import { Badge } from 'antd';

function Layout({children}) {
    const navigate = useNavigate();
    const location = useLocation();
    const {user} = useSelector((state) => state.user);

    const userMenu = [

        {
            name: 'Home',
            path: '/',
            icon: "ri-home-4-line"
        },
        {
            name: 'Appointments',
            path: '/appointments',
            icon: 'ri-file-list-line'
        },
        {
            name: 'Apply Doctor',
            path: '/apply-doctor',
            icon: "ri-hospital-line"
        },

    ];

    const doctorMenu = [

        {
            name: 'Home',
            path: '/',
            icon: "ri-home-4-line"
        },
        {
            name: 'Appointments',
            path: '/doctor/appointments',
            icon: 'ri-file-list-line'
        },
        {
            name: "Profile",
            path: `/doctor/profile/${user?._id}`,
            icon: 'ri-user-line'
        }

    ];

    const adminMenu = [

        {
            name: 'Home',
            path: '/',
            icon: "ri-home-4-line"
        },
        {
            name: "Users",
            path: "/admin/userslist",
            icon: "ri-user-line"
        },
        {
            name: 'Doctors',
            path: '/admin/doctorslist',
            icon: "ri-hospital-line"
        },
        {
            name: "Profile",
            path: "/profile",
            icon: 'ri-user-line'
        }

    ];

    const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu; 
    const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor": "User";
  return (
    <div className='main'>
        <div className='sidebar'>
                <div className="sidebar-header">
                    <h1 className='logo'>OAS</h1>
                    <h1 className="normal-text">{role}</h1>
                 </div>     
                 <div className="menu">
                    {menuToBeRendered.map((menu) => {
                        const isActive = location.pathname === menu.path;
                        return (<div className={`flex menu-item ${isActive && 'active-menu-item'}`}>
                            <i className={menu.icon}></i>
                            <Link to={menu.path}>{menu.name}</Link>
                        </div>
                        )
                    })}

                        <div className={`flex menu-item`} onClick={() => {
                            localStorage.clear()
                            navigate('/login');
                        }}>
                            <i className='ri-logout-circle-line'></i>
                            <Link to='/login'>Logout</Link>
                        </div>

                    </div>            
            </div> 
        <div className='layout'>
            {/* <div className='sidebar'>
                    sidebar                    
            </div>  */}
            <div className="content">
                <div className="header">
                    <div className="d-flex align-items-center px-4">

                    <Link className='anchor' to='/profile'>{user?.name}</Link>

                    <Badge count={user?.unseenNotifications.length} onClick = {() => navigate('/notifications')}>
                    <i className=" noti ri-notification-line header-action-icon px-3"></i>
                    </Badge>

                       
                        
                    </div>
                </div>
                <div className="body">
                    {children}
                </div>
            </div>
        </div>

    </div>
  )
  
}

export default Layout