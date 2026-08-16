import React from "react";
import "./NewsModal.css";
import "./Modal.css";
import demoImg from "../assets/noimg.jpg";
const Bookmarks = ({
  show,
  bookmarks,
  onClose,
  onSelectArticle,
  onDeleteBookmark,
}) => {
  if (!show) {
    return null;
  }
  return (
    <div className="modal-overlay" style={{ zIndex: 100 }}>
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </span>
        <h2 className="bookmarks-heading">BOOKMARKED NEWS</h2>
        <div className="bookmarks-list">
          {bookmarks.map((article, index) => (
            <div
              className="bookmark-item"
              key={index}
              onClick={() => onSelectArticle(article)}
            >
              <img src={article.image || demoImg} alt={article.title} />
              <h3 className="bookmark-heading">{article.title}</h3>
              <span
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteBookmark(article);
                }}
              >
                <i className="fa-regular fa-circle-xmark"></i>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;
