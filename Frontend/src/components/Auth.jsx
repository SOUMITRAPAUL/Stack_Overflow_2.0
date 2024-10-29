import PropTypes from 'prop-types';
import { useState } from 'react';

function Auth({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    const res = await fetch(`http://localhost:8000/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      alert('Signup successful');
    } else {
      const errorData = await res.json();
      alert(errorData.message);
    }
  };

  const handleSignIn = async () => {
    const res = await fetch(`http://localhost:8000/signIn`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      setToken(data.token);
    } else {
      const errorData = await res.json();
      alert(errorData.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-blue-500">
      <div className="w-full max-w-xs bg-white rounded-lg shadow-lg p-6">
        <input
          type="email"
          placeholder="Email"
          className="block w-full p-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="block w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          onClick={handleSignUp}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition duration-200"
        >
          Sign Up
        </button>
        <button
          onClick={handleSignIn}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition duration-200 mt-2"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

Auth.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Auth;
