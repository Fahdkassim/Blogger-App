import { useState } from "react"
import Link from "next/link"
import { auth } from "../firebase"
import { useRouter } from 'next/router'

export default function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    router.push("/")
    try {
      const result = await auth.signInWithEmailAndPassword(email, password)
      M.toast({ html: `Welcome ${result.user.displayName}`, classes: "green" })

    }
    catch (error) {
      M.toast({ html: error.message, classes: "red" })
    }
  }
  return (
    <div className="container center">
      <h2>Please Login</h2>
      <form onSubmit={(e) => { handleSubmit(e) }}>
        <div className="input-field">
          <input type="email" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
        </div>
        <button type="submit" className="btn #00796b teal darken-2">Login</button>
      </form>
      <Link href="/signup"><a className="create"><h5>New user - create an account</h5></a></Link>
    </div>
  )
}