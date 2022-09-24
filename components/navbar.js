import Link from "next/link"
import { useRouter } from "next/router"
import { auth } from "../firebase"

export default function Navbar({ user }) {
  const router = useRouter();
  const logout = () => {
    auth.signOut()
    router.push('/')
  }
  return (
    <nav>
      <div className="nav-wrapper #00796b teal darken-2 nav-bar">
        <Link href="/"><a className="logo">Blogger</a></Link>
        <ul id="nav-mobile" className="right">
          {
            user ?
              <>
                <li><Link href="/createblog"><a>Create blog</a></Link></li>
                <button className="btn red" onClick={() => { logout() }}>Logout</button>
              </>
              : <>
                <li className="nav-links"><Link href="/login">Login</Link></li>
                <li className="nav-links"><Link href="/signup">Signup</Link></li>
              </>
          }
        </ul>
      </div>
    </nav>
  )
}