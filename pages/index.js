/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { db } from "../firebase"
import { useState } from "react";

export default function Home({ allBlogs }) {

  const [blogs, setblogs] = useState(allBlogs);
  const [end, setEnd] = useState(false)

  const loadMore = async () => {
    const last = blogs[blogs.length - 1]
    const result = await db.collection('blogs')
      .orderBy('createdAt', "desc")
      .startAfter(new Date(last.createdAt))
      .limit(3)
      .get();
    const newblogs = result.docs.map(docSnap => {
      return {
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt.toMillis(),
        id: docSnap.id
      }
    })
    setblogs(blogs.concat(newblogs))
    if (newblogs.length < 3) {
      setEnd(true)
    }
  }

  return (
    <div className="center blogs-container">
      {blogs.map(blog => {
        return (
          // eslint-disable-next-line react/jsx-key
          <div className="card" key={blog.createdAt}>
            <div className="card-image">
              <img alt="image" src={blog.imageUrl} />
              <span className="card-title">{blog.title}</span>
            </div>
            <div className="card-content">
              <p className="min">{blog.body}</p>
            </div>
            <div className="card-action #00796b teal darken-2">
              <Link href={`/blogs/${blog.id}`}><a >Read more</a></Link>
            </div>
          </div>
        )
      })}
      {end == false ?
        <div className="buttons-container">
          <button
            className="btn #00796b teal darken-2 button"
            onClick={() => loadMore()}>
            Load more
          </button>
        </div>
        : <h3>No more blogs</h3>
      }


    </div>

  )
}

export async function getServerSideProps(context) {
  const querySnap = await db.collection('blogs').orderBy('createdAt', "desc").limit(3).get();
  const allBlogs = querySnap.docs.map(docSnap => {
    return {

      ...docSnap.data(),
      createdAt: docSnap.data().createdAt.toMillis(),
      id: docSnap.id
    }

  })

  return {
    props: { allBlogs }, // will be passed to the page component as props
  }
}