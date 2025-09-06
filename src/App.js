import { Route, Routes, Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import "./index.css";

function LoaderSpinner() {
  return (
    <div data-testid="loader">
      <TailSpin color="#00bfff" height={50} width={50} />
    </div>
  );
}

function UserInfo() {
  return (
    <div className="user-info-container">
      <img
        className="profile-img"
        src="https://assets.ccbp.in/frontend/react-js/profile-img.png"
        alt="profile"
      />
      <h1 className="user-name">Wade Warren</h1>
      <p className="user-designation">Software developer at UK</p>
    </div>
  );
}

function BlogItem(props) {
  const { id, imageUrl, topic, title, avatarUrl, author } =
    props.blogItemDetails;

  return (
    <li className="blog-item">
      <Link to={`/blogs/${id}`} className="blog-item-link">
        <div className="blog-item-container">
          <img
            className="blog-item-image"
            src={imageUrl}
            alt={`blog-item-${id}`}
          />
          <div className="blog-item-info">
            <p className="blog-item-topic">{topic}</p>
            <h1 className="blog-item-title">{title}</h1>
            <div className="author-info">
              <img className="avatar" src={avatarUrl} alt={`author-${id}`} />
              <p className="author-name">{author}</p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}

function BlogList() {
  const [blogsData, setBlogsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function () {
    async function fetchBlogs() {
      try {
        const response = await fetch("https://apis.ccbp.in/blogs");
        const data = await response.json();
        const formatted = data.map(function (eachItem) {
          return {
            id: eachItem.id,
            title: eachItem.title,
            imageUrl: eachItem.image_url,
            avatarUrl: eachItem.avatar_url,
            author: eachItem.author,
            topic: eachItem.topic,
          };
        });
        setBlogsData(formatted);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <div className="blogs-list-container">
      {isLoading ? (
        <LoaderSpinner />
      ) : (
        <ul className="blogs-list">
          {blogsData.map(function (eachBlog) {
            return <BlogItem key={eachBlog.id} blogItemDetails={eachBlog} />;
          })}
        </ul>
      )}
    </div>
  );
}

function BlogItemDetails() {
  const { id } = useParams();
  const [blogData, setBlogData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    function () {
      async function fetchBlogDetails() {
        try {
          const response = await fetch(`https://apis.ccbp.in/blogs/${id}`);
          const data = await response.json();
          const formatted = {
            title: data.title,
            imageUrl: data.image_url,
            content: data.content,
            avatarUrl: data.avatar_url,
            author: data.author,
          };
          setBlogData(formatted);
        } catch (err) {
          console.error("Error fetching blog details:", err);
        } finally {
          setIsLoading(false);
        }
      }
      fetchBlogDetails();
    },
    [id]
  );

  if (isLoading) {
    return (
      <div className="blog-container">
        <LoaderSpinner />
      </div>
    );
  }

  if (!blogData) {
    return <p className="error-text">Blog not found.</p>;
  }

  return (
    <div className="blog-container">
      <h1 className="blog-details-title">{blogData.title}</h1>
      <div className="author-details">
        <img
          className="author-pic"
          src={blogData.avatarUrl}
          alt={blogData.author}
        />
        <p className="details-author-name">{blogData.author}</p>
      </div>
      <img
        className="blog-image"
        src={blogData.imageUrl}
        alt={blogData.title}
      />
      <p className="blog-content">{blogData.content}</p>
    </div>
  );
}

function About() {
  return (
    <div className="about-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/about-blog-img.png"
        alt="about"
        className="about-img"
      />
      <h1 className="about-heading">About</h1>
      <p className="about-paragraph">
        I love to create! I am a front-end web developer
      </p>
    </div>
  );
}

function Contact() {
  return (
    <div className="contact-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/contact-blog-img.png"
        alt="contact"
        className="contact-img"
      />
      <h1 className="contact-heading">Contact</h1>
    </div>
  );
}

function NotFound() {
  return (
    <div className="not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png"
        alt="not found"
        className="not-found-img"
      />
      <h1 className="not-found-heading">Not Found</h1>
    </div>
  );
}

function Home() {
  return (
    <div className="home-container">
      <UserInfo />
      <BlogList />
    </div>
  );
}

function Header() {
  return (
    <nav className="header-container">
      <div className="logo-and-title-container">
        <img
          alt="wave"
          className="logo"
          src="https://assets.ccbp.in/frontend/react-js/wave-logo-img.png"
        />
        <h1 className="title">Wave</h1>
      </div>
      <ul className="nav-items-list">
        <li className="link-item">
          <Link className="route-link" to="/">
            Home
          </Link>
        </li>
        <li className="link-item">
          <Link className="route-link" to="/about">
            About
          </Link>
        </li>
        <li className="link-item">
          <Link className="route-link" to="/contact">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}

function App() {
  return (
    <div className="app-container">
      <div className="responsive-container">
        <Header />
        <div className="app-body">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blogs/:id" element={<BlogItemDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
