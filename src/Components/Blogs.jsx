import React, { useEffect, useState } from "react";
import "./Blogs.css";
import userImg from "../assets/react.svg";
import noImg from "../assets/noimg.jpg";

const Blogs = ({ onBack, onCreateBlog, editPost, isEditing }) => {
  const [showForm, setshowForm] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [titleValid, setTitleValid] = useState(true);
  const [contentValid, setContentValid] = useState(true);


  useEffect(() => {
    if (isEditing && editPost) {
      setImage(editPost.image);
      setTitle(editPost.title);
      setContent(editPost.content);
      setshowForm(true)
    } else {
      setImage(null);
      setTitle("");
      setContent("");
      setshowForm(false)
    }
  }, [isEditing, editPost]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const maxSize = 1 * 1024 * 1024;

      if (file.size > maxSize) {
        alert(`File Size exceeds 1 MB`);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setTitleValid(true);
  };
  const handleContentChange = (e) => {
    setContent(e.target.value);
    setContentValid(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content) {
      if (!title) setTitleValid(false);
      if (!content) setContentValid(false);
      return;
    }
    const newBlog = {
      image: image || noImg,
      title,
      content,
    };
    onCreateBlog(newBlog, isEditing);
    setImage(null);
    setTitle("");
    setContent("");
    setshowForm(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onBack();
    }, 3000);
  };

  return (
    <div className="blogs">
      <div className="blogs-left">
        <img src={userImg} className="profile-img" alt="" />
        {image && (
          <>
            <div className="image-preview-div">
              <img className="image-preview" src={image} alt="Preview" />
              <div className="image-actions">
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => setImage(null)}
                >
                  <i className="fa-solid fa-circle-xmark"></i>
                </button>
                <label htmlFor="file-upload" className="replace-btn">
                  <i className="fa-solid fa-file-arrow-up"></i>
                </label>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="blogs-right">
        {!showForm && !submitted && (
          <button className="post-btn" onClick={() => setshowForm(true)}>
            Create New Post
          </button>
        )}
        {submitted && <p className="submission-message">Post Submitted!</p>}
        <div className={`blogs-right-form ${showForm ? "visible" : "hidden"}`}>
          <h1>{isEditing ? 'Edit Post' : 'Create Post'}</h1>
          <form onSubmit={handleSubmit}>
            <div className="img-upload">
              <label htmlFor="file-upload" className="file-upload">
                Upload Image
                <i className="fa-solid fa-file-arrow-up"></i>
              </label>
              <input
                onChange={handleImageChange}
                type="file"
                name=""
                id="file-upload"
                accept="image/*"
              />
            </div>
            <input
              type="text"
              placeholder="Add Title(Max 60 Characters)"
              maxLength={60}
              className={`title-input ${!titleValid ? "invalid" : ""}`}
              value={title}
              onChange={handleTitleChange}
            />
            <textarea
              className={`text-input ${!contentValid ? "invalid" : ""}`}
              placeholder="Add Text"
              value={content}
              onChange={handleContentChange}
            ></textarea>
            <button className="submit-btn"> {isEditing ? 'Update Post' : 'Submit Post'} </button>
          </form>
        </div>

        <button className="blogs-close-btn" onClick={onBack}>
          Back<i className="fa-solid fa-angle-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Blogs;
