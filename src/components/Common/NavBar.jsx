import React, { useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navMenus } from '../../utils/menuList'
import { FcGoogle } from 'react-icons/fc'

import { GoogleLogin,GoogleOAuthProvider  } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../redux/slices/authSlice';

const NavBar = () => {
  const path = useLocation().pathname;
  const googleClientId = import.meta.env.VITE_AUTH_CLIENT_ID;

  const user = useSelector((state) => state.auth.authData);
  const dispatch = useDispatch();
  const {name} = user || {};
  const [isAuth, setIsAuth] = useState(!!name);

  const handleLoginSuccess = useCallback((credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      dispatch(login({authData: decoded}));
      setIsAuth(true);
    } catch (error) {
      console.log("Login Failed", error);
    }
    
  }, [dispatch])



  const handleLoginError = (error) => {
    console.log("Login Failed", error);
  }

  const handleLogout = () => {
    dispatch(logout());
    setIsAuth(false);
  }

  return (
    <nav className='bg-[#212121] w-1/5 h-full rounded-lg border border-gray-500 py-10 px-4
      flex flex-col justify-between items-center
    '>
      <div className="logo-wrapper flex w-full items-center justify-center gap-8">
        <div className="logo"></div>
        <h2 className='font-semibold text-xl'>
          <Link to="/">
            Task
          </Link>
        </h2>
      </div>
      <ul className='menus'>
      {navMenus.map((menu, idx) => (
        <li key={idx} className={
        `mb-1 rounded-md border 
        border-gray-700 hover:bg-gray-950 animate-all duration-300
        ${path === menu.to ? 'bg-gray-950' : ''}`
        }>
          <Link to={menu.to} className='flex gap-x-4 items-center py-2 px-10'>
            {menu.icon}
            <span>{menu.label}</span>
          </Link>
        </li>
      ))}
      </ul>
      {
        isAuth
        ?(
          <div className='w-4/5 flex items-center justify-center'>
            <button onClick={handleLogout} className="login-btn flex justify-center items-center gap-2 bg-gray-400 text-gray900 py-3 px-4 rounded-md w-full">
                <FcGoogle className='w-5 h-5'/>
                <span>{name}님 로그아웃</span>
            </button>
          </div>
        )
        :(
          <div className="auth-wrapper w-4/5 flex justify-center login-btn">
            <GoogleOAuthProvider clientId={googleClientId}>
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginError}
              />
              <button className="login-btn flex justify-center items-center gap-2 bg-gray-400 text-gray900 py-3 px-4 rounded-md w-full">
                
                  <FcGoogle className='w-5 h-5'/>
                  <span>Google Login</span>
              </button>
            </GoogleOAuthProvider>
          </div>
        )
      }
    </nav>
  )
}

export default NavBar
