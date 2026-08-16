import React from "react";

import "./NewsModal.css";
import demoImg from "../assets/tech.jpg";
const BlogsModal = ({show, blog, onClose}) => {
  if(!show){
    return null;

  }
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        {blog.image && <img src={blog.image} alt="Modal Image" className="modal-image" /> }
        
        <h2 className="modal-title">{blog.title}</h2>
        <p className="modal-content-text">{blog.content}</p>
      </div>
    </div>
  );
};

export default BlogsModal;
