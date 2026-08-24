import React, { useEffect, useState } from "react";
import Bookmarks from "./Bookmarks.jsx";
import "./News.css";
import userImg from "../assets/react.svg";
import noImg from "../assets/noimg.jpg";
import axios from "axios";
import NewsModal from "./NewsModal";
import Footer from "./Footer.jsx";
import BlogsModal from "./BlogsModal.jsx";
const categories = [
  "general",
  "world",
  "business",
  "technology",
  "entertainment",
  "sport",
  "science",
  "health",
  "nation",
];

const News = ({ onShowBlogs, blogs, onEditBlog, blogtoDelete }) => {
  const [headline, setheadline] = useState(null);
  const [News, setNews] = useState([]);
  const [selectedCategory, setselectedCategory] = useState("general");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setshowModal] = useState(false);
  const [selectedArticle, setselectedArticle] = useState(null);
  const [bookmarks, setbookmarks] = useState([]);
  const [showBookmarkModal, setshowBookmarkModal] = useState(false);
  const [selectedPost, setselectedPost] = useState(null);
  const [showBlogModal, setshowBlogModal] = useState(false);

  useEffect(() => {
    const fetchnews = async () => {
      const APIkey = "9014bb36238b8dcd9caed2b5d8e5d95c";
      let url = `/api/gnews/top-headlines?category=${selectedCategory}&lang=en&apikey=${APIkey}`;
      if (searchQuery) {
        url = `/api/gnews/search?q=${searchQuery}&lang=en&apikey=${APIkey}`;
      }
      const respone = await axios.get(url);
      const fetchedNews = await respone.data.articles;
      fetchedNews.forEach((article) => {
        if (!article.image) {
          article.image = noImg;
        }
      });
      setheadline(fetchedNews[0]);
      setNews(fetchedNews.slice(1, 10));
      console.log(fetchedNews);

      const savedBookmarks =
        JSON.parse(localStorage.getItem("bookmarks")) || [];
      setbookmarks(savedBookmarks);
    };
    fetchnews();
  }, [selectedCategory, searchQuery]);

  const handleCategoryClick = (e, category) => {
    e.preventDefault();
    setselectedCategory(category);
  };
  const limitTitleWords = (title, limit = 8) => {
    if (!title) return "";
    return title.split(" ").slice(0, limit).join(" ");
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setSearchInput("");
  };

  const handleArticleClick = (article) => {
    setselectedArticle(article);
    setshowModal(true);
  };
  // main Bookmark function and the localStorage set for bookmarks
  const handleBookmarkClick = (article) => {
    setbookmarks((prevBookmarks) => {
      const updatedBookmarks = prevBookmarks.find(
        (bookmark) => bookmark.title === article.title
      )
        ? prevBookmarks.filter((bookmark) => bookmark.title !== article.title)
        : [...prevBookmarks, article];
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
      return updatedBookmarks;
    });
  };

  const handleBlogClick = (blog) => {
    setselectedPost(blog);
    setshowBlogModal(true);
  };
  const closeBlogModal = () => {
    setshowBlogModal(false);
    setselectedPost(null);
  };
  return (
    <div className="news">
      <header className="news-header">
        <h1 className="logo">News & Blogs</h1>
        <div className="search-bar">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search News..."
            />
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </header>
      <div className="news-content">
        <div className="navbar">
          <div className="user">
            <img src={userImg} alt="User Img" />
            <p>Ahsan Gillani</p>
          </div>
          <nav className="categories">
            <h1 className="nav-heading">Categories</h1>
            <div className="nav-links">
              {categories.map((category) => (
                <a
                  key={category}
                  className="nav-link"
                  href="#"
                  onClick={(e) => handleCategoryClick(e, category)}
                >
                  {category}
                </a>
              ))}

              <a
                href="#"
                className="nav-link"
                onClick={() => setshowBookmarkModal(true)}
              >
                Bookmarks <i className="fa-regular fa-bookmarks"></i>
              </a>
            </div>
          </nav>
        </div>
        <div className="news-section">
          <div
            className="headline"
            onClick={() => handleArticleClick(headline)}
          >
            {!headline ? (
              <p>loading Headline... </p>
            ) : (
              <>
                <img src={headline.image || noImg} alt={headline.title} />
                <h2 className="headline-title">
                  {headline.title}
                  <i
                    className={`${
                      bookmarks.some(
                        (bookmark) => bookmark.title === headline.title
                      )
                        ? "fa-solid"
                        : "fa-regular"
                    } fa-bookmark bookmark`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookmarkClick(headline);
                    }}
                  ></i>
                </h2>
              </>
            )}
          </div>
          <div className="news-grid">
            {News.length === 0 ? (
              <p>Loading News...</p>
            ) : (
              News.map((article, index) => (
                <div
                  key={index}
                  className="news-grid-item"
                  onClick={() => handleArticleClick(article)}
                >
                  <img src={article.image || noImg} alt={article.title} />
                  <h3>
                    {limitTitleWords(article.title)}

                    <i
                      className={`${
                        bookmarks.some(
                          (bookmark) => bookmark.title === article.title
                        )
                          ? "fa-solid"
                          : "fa-regular"
                      } fa-bookmark bookmark`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookmarkClick(article);
                      }}
                    ></i>
                  </h3>
                </div>
              ))
            )}
          </div>
        </div>
        <NewsModal
          show={showModal}
          article={selectedArticle}
          onClose={() => setshowModal(false)}
        />
        <Bookmarks
          show={showBookmarkModal}
          bookmarks={bookmarks}
          onClose={() => setshowBookmarkModal(false)}
          onSelectArticle={handleArticleClick}
          onDeleteBookmark={handleBookmarkClick}
        />
        <div className="my-blogs">
          <h1 className="my-blogs-heading">
            My Blogs{" "}
            <button className="create-post" onClick={onShowBlogs}>
              <i class="fa-regular fa-square-plus"></i>
            </button>{" "}
          </h1>

          <div className="blog-posts">
            {/* Blog post */}
            {blogs.map((blog, index) => (
              <div
                key={index}
                className="blog-post"
                onClick={() => handleBlogClick(blog)}
              >
                <img
                  src={blog.image || noImg}
                  alt={blog.title}
                  className="blog-image"
                />
                <h3>{blog.title}</h3>

                <div className="post-buttons">
                  <button
                    className="delete-post"
                    onClick={(e) => {
                      e.stopPropagation();
                      blogtoDelete(blog);
                    }}
                  >
                    <i className="fa-regular fa-circle-xmark"></i>
                  </button>
                  <button
                    onClick={() => onEditBlog(blog)}
                    className="edit-post"
                  >
                    <i className="fa-regular fa-pen-to-square"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
          {selectedPost && showBlogModal && (
            <BlogsModal
              show={showBlogModal}
              blog={selectedPost}
              onClose={closeBlogModal}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default News;
