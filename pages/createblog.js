/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { storage, db, serverTimeStamp } from "../firebase";
import { getDownloadURL } from "firebase/storage";

export default function Createblog({ user }) {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [url, setUrl] = useState("")
  const [image, setImage] = useState(null)

  useEffect(() => {
    if (url) {
      try {

        db.collection('blogs').add({
          title: title,
          body: body,
          imageUrl: url,
          postedBy: user.uid,
          createdAt: serverTimeStamp
        })
        M.toast({ html: "Blog created successfully", classes: "green" })
      }
      catch (error) {

        M.toast({ html: error.message, classes: "red" })
      }
    }
  }, [url])



  const submitDetails = () => {
    if (!title || !body || !image) {
      return M.toast({ html: "Please fill in all the details", classes: "red" })
    }
    var uploadTask = storage.ref().child(`image/${uuidv4()}`).put(image)
    uploadTask.on('state_changed',
      (snapshot) => {

        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (progress == '100') {
          M.toast({ html: "Image uploaded", classes: "green" })
        }
      },
      (error) => {
        M.toast({ html: error.message, classes: "red" })
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setUrl(downloadURL)
        });
      }
    );
  }

  return (
    <div className="input-field blog-container">
      <div className="blog-header">
        <h3 >Create a blog !</h3>
      </div>

      <input
        type="text"
        value={title}
        placeholder="Title"
        onChange={(e) => { setTitle(e.target.value) }}
      />
      <textarea
        className="text-area"
        type="text"
        value={body}
        placeholder="Content"
        onChange={(e) => { setBody(e.target.value) }}
      />
      <div className="file-field input-field">
        <div className="btn #00796b teal darken-2">
          <span>File</span>
          <input type="file" onChange={(e) => { setImage(e.target.files[0]) }} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button className="btn #00796b teal darken-2" onClick={() => { submitDetails() }}>Save blog</button>
    </div >
  )

}