import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route
} from "react-router-dom";
import Helmet from 'react-helmet';

import SignInScreen from './screens/SignInScreen';
import MainScreen from './screens/MainScreen';
import MovieScreen from './screens/MovieScreen';
import UserTokensScreen from './screens/UserTokensScreen';
import BuyTokensScreen from './screens/BuyTokensScreen';
import BarcodeScreen from './screens/BarcodeScreen';
import HowItWorksScreen from './screens/HowItWorksScreen';
import PoliciesScreen from './screens/PoliciesScreen';
import ContactScreen from './screens/ContactScreen';
import PurchaseSuccessful from './screens/PurchaseSuccessful';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ReceiptScreen from './screens/ReceiptScreen';

import AppContext from './config/context';

import signInServices from './controller/signInServices';

export default function AppRouter() {
  const [globalMoviePosition, setGlobalMoviePosition] = useState(0);

  const { getUser, setUser, signOut } = signInServices;
  
  return (
    <AppContext.Provider value={{
      getUser,
      globalMoviePosition,
      setGlobalMoviePosition,
      setUser,
      signOut
    }} >    
    <Router>
    <Helmet>
                <title>VUDU Disc To Digital</title>
                <meta name="description" content="Database for movies available on Disc To Digital"  data-react-helmet="true"/>
                <meta name="keywords" content="VUDU, vudu disc to digital, vududisctodigital, digital movie, digital movies, digitalmovie, digitalmovies, disctodigital, disc to digital"  data-react-helmet="true"/>
                <meta name="author" content="VuduDiscToDigital"  data-react-helmet="true"/>
            </Helmet>
        <div className="content">
          <Routes>
            <Route path="/home" element={<MainScreen />} />
            <Route path="/receipts" element={<ReceiptScreen />} />
            <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
            <Route path="/purchase-successful" element={<PurchaseSuccessful />} />
            <Route path="/policies" element={<PoliciesScreen />} />
            <Route path="/contact" element={<ContactScreen />} />
            <Route path="/barcode" element={<BarcodeScreen />} />
            <Route path="/howitworks" element={<HowItWorksScreen />} />
            <Route path="/buytokens" element={<BuyTokensScreen />} />
            <Route path="/movie" element={<MovieScreen />} />
            <Route path="/usertokens" element={<UserTokensScreen />} />
            <Route path="/" element={<SignInScreen />} />
            <Route
              path="*"
              element={
                <Navigate replace to="/" />
              }
            />
          </Routes>
        </div>
      </Router>
    </AppContext.Provider>

  );
}
