import { useEffect, useState } from "react";
import News from "./Components/News";
import Blogs from "./Components/Blogs";

function App() {
  const [showNews, setshowNews] = useState(true);
  const [showBlogs, setshowBlogs] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [selectPost, setSelectPost] = useState(null);
  const [isEditing, setIsEdting] = useState(false);

  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    setBlogs(savedBlogs);
  }, []);

  const handleCreateBlog = (newBlog, isEdit) => {
    setBlogs((prevBlogs) => {
      const updatedBlogs = isEdit
        ? prevBlogs.map((blog) => (blog === selectPost ? newBlog : blog))
        : [...prevBlogs, newBlog];

      localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
      return updatedBlogs;
    });
    setIsEdting(false);
    setSelectPost(null);
  };
const handleDeleteBlog = (blogtoDelete) => {
  
  setBlogs((prevBlogs) => { const updatedBlogs = prevBlogs.filter((blog) => blog !== blogtoDelete)
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs))
    return updatedBlogs;
  })
}

  const handleShowBlogs = () => {
    setshowNews(false);
    setshowBlogs(true);
  };

  const handleBackToNews = () => {
    setshowBlogs(false);
    setshowNews(true);
    setIsEdting(false);
    setSelectPost(null);
  };
  const handleEditBlog = (blog) => {
    setSelectPost(blog);
    setIsEdting(true);
    setshowNews(false);
    setshowBlogs(true);
  };
  return (
    <div className="container">
      <div className="news-blogs-app">
        {showNews && (
          <News
            onShowBlogs={handleShowBlogs}
            onEditBlog={handleEditBlog}
            blogs={blogs}
            blogtoDelete={handleDeleteBlog}
          />
        )}
        {showBlogs && (
          <Blogs
            onBack={handleBackToNews}
            onCreateBlog={handleCreateBlog}
            editPost={selectPost}
            isEditing={isEditing}

          />
        )}
      </div>
    </div>
  );
}

export default App;
