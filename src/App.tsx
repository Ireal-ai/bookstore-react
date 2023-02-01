import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAppDispatch } from './store';
import { setUser } from './store/userReducer';

import userApi from './api/userApi';
import constants from './constants';
import config from './config';

import Header from './ui/containers/Header';
import Footer from './ui/containers/Footer';
import Navigation from './ui/containers/Navigation';
import MainWrapper from './ui/components/MainWrapper';

export const socket = io(config.apiBaseUrl);

const App = () => {
  const dispatch = useAppDispatch();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const listener = () => {
      console.log(`Connected with socket id: ${socket.id}`);
    };
    socket.on('connect', listener);

    return () => {
      socket.off('connect', listener);
    };
  }, []);

  useEffect(() => {
    (async () => {
      const token = Cookies.get(constants.token.access);
      console.log('token', token);
      
      if (!token) {
        setIsAuthChecked(true);

        return;
      }
      const response = await userApi.checkToken(token).catch(() => null);
      if (response) {
        dispatch(setUser(response.data.user));
      }
      setIsAuthChecked(true);
    })();
  }, [setIsAuthChecked, dispatch]);

  if (!isAuthChecked) {
    return null;
  }

  return (
    <>
      <Header />

      <MainWrapper>
        <Navigation />
      </MainWrapper>

      <Footer />

      <ToastContainer />
    </>
  );
};

export default App;
