import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../utility/signup.css'; // For custom styles
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    // You can add signup logic here
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    navigate('/login'); // Navigate to login page after signup
  };

  return (
    <div className="signup-container d-flex align-items-center justify-content-center flex-column">
      <h2 className="text-center">Sign Up</h2>
      <div className="signup-box p-4 shadow rounded mx-2">
        <form onSubmit={handleSignup}>
          <div className="form-group mb-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div className="form-group mb">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-grey w-100">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
