//Este archivo desaparecería
import Head from 'next/head'
import Navbar from '../components/Navbar'
import '../styles/global.css'
import getFirebase from "../firebase/firebaseconfiguration"
import {createBrowserHistory} from "history";
import { StrictMode } from "react";
import ReactDOM from "react-dom";

export default function App({ Component, pageProps }) {
  const history = require("history").createBrowserHistory;
  // createBrowserHistory({ forceRefresh: true });

  return <>
    <Head>
    <title>Farmacias Sanate</title>
    <link rel="icon" href="/favicon.ico" />
    <link rel="preconnect" href="https://fonts.googleapis.com"/> 
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/> 
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet"/>
    </Head>
    <Navbar />
    <Component {...pageProps} history = {history} />
    </>
}