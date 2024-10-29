import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function PostList({ token }) {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState('');
  const [showingUserPosts, setShowingUserPosts] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [token]);

  const fetchPosts = async () => {
    const res = await fetch(`http://localhost:8000/post`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setPosts(data);
    setShowingUserPosts(false);
  };

  const fetchUserPosts = async () => {
    const res = await fetch(`http://localhost:8000/mypost`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setPosts(data);
    setShowingUserPosts(true);
  };

  const handleCreatePost = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (file) {
      formData.append('codeSnippet', file);
      formData.append('fileType', fileType);
    }

    const res = await fetch(`http://localhost:8000/post`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (res.ok) {
      setTitle('');
      setContent('');
      setFile(null);
      setFileType('');
      alert("Post created successfully");
      fetchPosts();
    } else {
      alert('Error creating post');
    }
  };

  const handleFileTypeSelection = (type) => {
    setFileType(type);
    setIsDropdownOpen(false);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-lg">
      <div className='flex justify-between mb-6'>
        <h2 className="text-xl font-bold">Create a Post</h2>
        <button
          onClick={showingUserPosts ? fetchPosts : fetchUserPosts}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          {showingUserPosts ? "View Posts by Others" : "View My Posts"}
        </button>
      </div>
      
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
        className="block w-full p-2 mb-2 border rounded"
      />
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Content"
        className="block w-full p-2 mb-2 border rounded"
      />

      {/* Custom file input with dropdown */}
      <div className="relative inline-block w-full mb-4">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="bg-gray-300 p-2 rounded w-full text-left"
        >
          {fileType ? `File Type: ${fileType}` : "Choose File Type and Upload"}
        </button>
        
        {isDropdownOpen && (
          <div className="absolute bg-white border rounded shadow mt-1 w-full z-10">
            {[".c", ".cpp", ".java", ".py"].map(type => (
              <div
                key={type}
                onClick={() => handleFileTypeSelection(type)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {type.toUpperCase()} ({type})
              </div>
            ))}
          </div>
        )}
      </div>

      {fileType && (
        <input
          type="file"
          onChange={e => setFile(e.target.files[0])}
          className="block w-full p-2 mt-2 mb-4 border rounded"
        />
      )}

      <button
        onClick={handleCreatePost}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-6"
      >
        Create Post
      </button>

      <h2 className="text-xl font-bold mb-4">{showingUserPosts ? "My Posts" : "Posts by Others"}</h2>
      {posts.length ? (
        posts.map(post => (
          <div key={post._id} className="p-4 mb-4 bg-gray-100 border rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-2">{post.title}</h3>
            <p className="mb-2">{post.content}</p>
            {post.codeSnippetUrl && (
              <a
                href={post.codeSnippetUrl}
                className="text-blue-500 hover:text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Code Snippet
              </a>
            )}
          </div>
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}

PostList.propTypes = {
  token: PropTypes.string.isRequired,
};

export default PostList;
