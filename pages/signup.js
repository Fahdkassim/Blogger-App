import { useState } from "react"
import Link from "next/link"
import { auth } from "../firebase"
import { useRouter } from "next/router"



export default function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    router.push("/")
    try {

      const result = await auth.createUserWithEmailAndPassword(email, password)
      result.user.updateProfile({
        displayName: name
      })
      M.toast({ html: `Welcome ${name}`, classes: "green" })
    }
    catch (error) {
      M.toast({ html: error.message, classes: "red" })
    }
  }
  return (
    <div className="container center">
      <h2>Please Signup</h2>
      <form onSubmit={(e) => { handleSubmit(e) }}>
        <div className="input-field">
          <input type="text" placeholder="Name" value={name} onChange={(e) => { setName(e.target.value) }} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
        </div>
        <button type="submit" className="btn #00796b teal darken-2">Signup</button>
      </form>
      <Link href="/login"><a className="create"><h5>Already have an account</h5></a></Link>
    </div>
  )
}