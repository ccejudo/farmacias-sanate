import Head from 'next/head'
import Navbar from '../components/Navbar'
import '../styles/global.css'

export default function App({ Component, pageProps }) {
  return <>
    <Head>
    <title>Farmacias Sanate</title>
    <link rel="icon" href="/favicon.ico" />
    <link rel="preconnect" href="https://fonts.googleapis.com"/> 
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/> 
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet"/>
    </Head>
    <Navbar />
    <Component {...pageProps} />
    </>
}