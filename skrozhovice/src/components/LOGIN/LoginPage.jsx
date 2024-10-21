import React, { useState, useEffect } from 'react';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUserInfo(payload.username); 
    }
  }, []);

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
        const payload = JSON.parse(atob(data.token.split('.')[1]));
        setUserInfo(payload.username);
        setError('');
        setIsLoggedIn(true);
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
          <button onClick={handleLogout} className="logout-button">Odhlásit</button>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
