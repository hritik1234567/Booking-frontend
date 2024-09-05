import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // You can add login logic here
    console.log('Email:', email);
    console.log('Password:', password);
    navigate('/'); // Navigate to home page or dashboard after login
  };

  return (
    <div className="signup-container d-flex align-items-center justify-content-center flex-column">
      <h2 className="text-center">Login</h2>
      <div className="signup-box p-4 shadow rounded mx-2">
        <form onSubmit={handleLogin}>
          <div className="form-group mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-grey w-100">Sign In</button>
        </form>
        <button onClick={() => navigate('/signup')} className="btn btn-grey w-100 mt-2">Sign Up</button>
      </div>
    </div>
  );
}

export default Login;
