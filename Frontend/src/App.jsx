import { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import NotificationList from "./components/NotificationList";
import PostList from "./components/PostList";
import SinglePost from "./components/SinglePost";

function App() {
  const [token, setToken] = useState(null); // Token for authenticated user

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <div className="min-h-screen bg-blue-50 p-4"> {/* Changed background color */}
      <BrowserRouter>
        {!token ? (
          <Auth setToken={setToken} />
        ) : (
          <div className="container mx-auto">
            <header className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold text-gray-800">Welcome to the App</h1> {/* Updated heading styles */}
              <div className="flex gap-2">
                <Link className="font-bold text-white bg-blue-600 rounded-md p-2 m-2 hover:bg-blue-700 transition duration-200" to="/notifications"> {/* Updated button styles */}
                  Notifications
                </Link>
                <button
                  onClick={handleLogout}
                  className="ml-2 bg-red-500 hover:bg-red-600 text-white mt-2 py-2 px-4 rounded transition duration-200"
                >
                  Logout
                </button>
              </div>
            </header>
            <Routes>
              <Route path="/" element={<PostList token={token} />} />
              <Route path="/post/:postId" element={<SinglePost token={token} />} />
              <Route path="/notifications" element={<NotificationList token={token} />} />
            </Routes>
          </div>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
