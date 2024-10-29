import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NotificationList({ token }) {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
  }, [token]);

  const fetchNotifications = async () => {
    const res = await fetch(`http://localhost:8000/notification`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setNotifications(data);
  };

  const viewPost = (id) => {
    navigate(`/post/${id}`);
  };

  return (
    <div className="bg-blue-50 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>
      {notifications.length ? (
        notifications.map(notification => (
          <div key={notification._id} className="p-4 mb-4 bg-yellow-50 rounded shadow flex justify-between items-center hover:bg-yellow-100 transition duration-200">
            <p className="mr-4">{notification.message}</p>
            <button
              onClick={() => viewPost(notification.postId)}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200"
            >
              View Post
            </button>
          </div>
        ))
      ) : (
        <p>No notifications available.</p>
      )}
    </div>
  );
}

NotificationList.propTypes = {
  token: PropTypes.string.isRequired,
};

export default NotificationList;
