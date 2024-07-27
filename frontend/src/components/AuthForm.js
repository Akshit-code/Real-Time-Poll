import React from 'react';
import '../styles/AuthForm.css';

const AuthForm = ({ type, handleSubmit, username, setUsername, email, setEmail, password, setPassword }) => (
  <div className="auth-form">
    <h2>{type}</h2>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      {type === 'Signup' && (
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      )}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">{type}</button>
    </form>
  </div>
);

export default AuthForm;
