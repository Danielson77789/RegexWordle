import React, {useState} from 'react'
import axios from 'axios'
import '../css/login-card.css'
import { useNavigate } from 'react-router-dom';

function LoginCard() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate();
  
  const handleLogin = (e) => {
    e.preventDefault()
    const loginData = {
      username: username,
      password: password
    }
    axios.post('http://127.0.0.1:3000/auth/login', loginData).then((response) => {
      if (response.data) {
        const token = response.headers.get('Authorization').split(' ')[1]        
        document.cookie = `token=${token}; path=/`;
        navigate('game-page')
      }
    }).catch((err) => {
      setError(err.response.data.error)
    })
  }

  return(
  <div id='base-login-card'>

  <h1 id='login-card-title'>Login form</h1>

  <form onSubmit={handleLogin}>
    <div id='input-field-container'>
      <label htmlFor="username" id="username-label">Username:</label>
      <input
        type="text"
        id="username-input"
        name="username"
        value={username}
        placeholder='Username'
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password" id="password-label">Password:</label>
      <input
        type="password"
        id="password-input"
        name="password"
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <div id='error-container'>
      <p id='error'>{error}</p>
    </div>
    <div id='login-button-container'>
      <button type='submit' id='login-button'>Login</button>
    </div>  
  </form>

  </div>
  );
}
 


export default LoginCard;