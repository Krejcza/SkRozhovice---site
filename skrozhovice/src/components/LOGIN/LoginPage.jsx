import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [tokenExpiration, setTokenExpiration] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      const remainingTime = decodedToken.exp - currentTime;
      
      if (remainingTime > 0) {
        setIsLoggedIn(true);
        setUserInfo(decodedToken.username);
        setTokenExpiration(decodedToken.exp);
        setRemainingTime(remainingTime);
      } else {
        handleLogout();
      }
    }
  }, []);

  useEffect(() => {
    if (tokenExpiration) {
      const interval = setInterval(() => {
        const currentTime = Math.floor(Date.now() / 1000);
        setRemainingTime(tokenExpiration - currentTime);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [tokenExpiration]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        const decodedToken = jwtDecode(data.token);
        const currentTime = Math.floor(Date.now() / 1000);
        const remainingTime = decodedToken.exp - currentTime;

        setUserInfo(decodedToken.username);
        setError('');
        setIsLoggedIn(true);
        setTokenExpiration(decodedToken.exp);
        setRemainingTime(remainingTime);
        alert('Přihlášení úspěšné');
        setUsername('');
        setPassword('');
      } else {
        const { message } = await response.json();
        setError(message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Server error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserInfo(null);
    setUsername('');
    setPassword('');
    setTokenExpiration(null);
    setRemainingTime(null);
    alert('Byl(a) jste odhlášen(a)');
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="login-container">
      {!isLoggedIn ? (
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Přihlášení</h2>
          {error && <p className="error">{error}</p>}
          <div className="input-group">
            <label htmlFor="username">Uživatel:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Heslo:</label>
            <div className="password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="button" onClick={togglePasswordVisibility} className="toggle-password">
                {showPassword ? 'Skrýt' : 'Zobrazit'}
              </button>
            </div>
          </div>
          <button type="submit" className="login-button">Přihlásit</button>
        </form>
      ) : (
        <div className="logout-container">
          <h2>Přihlášen uživatel: {userInfo}</h2>
          <p>Zbývající čas tokenu: {remainingTime > 0 ? `${Math.floor(remainingTime / 60)} min ${remainingTime % 60} s` : 'Token vypršel'}</p>
          <button onClick={handleLogout} className="logout-button">Odhlásit</button>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
