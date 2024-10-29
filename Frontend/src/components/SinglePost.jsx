import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function SinglePost({ token }) {
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const postId = window.location.pathname.split('/')[2]; // Extract post ID from URL

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    const res = await fetch(`http://localhost:8000/post/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      const data = await res.json();
      setPost(data);
      setIsLoading(false);
    } else {
      alert('Error fetching post');
    }
  };

  if (isLoading) {
    return <div className="text-center text-gray-600">Loading...</div>; // Updated loading message color
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg"> {/* Changed background color here */}
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{post.title}</h2>
      <p className="mb-4 text-gray-700">{post.content}</p>
      {post.codeSnippet && (
        <div className="bg-gray-200 p-2 rounded overflow-x-auto">
          <code>{post.codeSnippet}</code>
        </div>
      )}
    </div>
  );
}

SinglePost.propTypes = {
  token: PropTypes.string.isRequired,
};

export default SinglePost;
