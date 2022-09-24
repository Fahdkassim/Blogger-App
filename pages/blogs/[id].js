/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { db, serverTimeStamp } from "../../firebase"
import { useRouter } from "next/router";

export default function BlogPage({ blog, user, allComments }) {
  const [comment, setComment] = useState("");
  const [blogComments, setBlogComments] = useState(allComments)
  const router = useRouter();
  const { id } = router.query;


  const submitComment = async () => {
    await db.collection('blogs').doc(id).collection("comments").add({
      text: comment,
      name: user.displayName,
      createdAt: serverTimeStamp
    })
    const updatedComments = await db.collection('blogs').doc(id).collection('comments').orderBy('createdAt', "desc").get()
    setBlogComments(updatedComments.docs.map(docComm => {
      return {
        ...docComm.data(),
        createdAt: docComm.data().createdAt.toMillis()
      }

    })
    )
    setComment("")
  }

  return (
    <div className="container center blogs-container">
      <h2>{blog.title}</h2>
      <p className="mid">Created on - <strong>{new Date(blog.createdAt).toDateString()}</strong></p>
      <img src={blog.imageUrl} alt={blog.title} className="img-detail" />
      <p>{blog.body}</p>
      {
        user ?
          <>
            <div className="input-field">
              <input
                type="text"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => { setComment(e.target.value) }}
              />
            </div>
            <button className="btn #00796b teal darken-2" onClick={() => submitComment()}>Add comment</button>
          </>
          :
          <p></p>

      }

      <hr />
      <h5>Comments</h5>
      <div className="container left">
        {
          blogComments.map(item => {
            return (
              <div key={item.createdAt} className="comments-container">
                <p id="comment-name">{item.name}</p>
                <p> - {item.text}</p>
                <p>  <strong>{new Date(item.createdAt).toDateString()}</strong></p>
              </div>
            )


          })
        }
      </div>
    </div>
  )
}
export async function getServerSideProps({ params: { id } }) {

  const result = await db.collection('blogs').doc(id).get();
  const allCommentsSnap = await db.collection('blogs').doc(id).collection('comments').get();
  const allComments = allCommentsSnap.docs.map(commentsData => {
    return {
      ...commentsData.data(),
      createdAt: commentsData.data().createdAt.toMillis()
    }

  })

  return {
    props: {
      blog: {
        ...result.data(),
        createdAt: result.data().createdAt.toMillis()
      },
      allComments: allComments
    }
  }
}