import '../styles/globals.css'
import Head from 'next/head'
import Navbar from '../components/navbar'
import { auth } from '../firebase'
import { useEffect, useState } from 'react'

function MyApp({ Component, pageProps }) {

  const [user, setUser] = useState(null)
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      (user) ? setUser(user) : setUser(null)
    })
  }, [])
  return (
    <div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />
      <Navbar user={user} />
      <Component {...pageProps} user={user} />
      <script defer src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    </div>
  )
}

export default MyApp
