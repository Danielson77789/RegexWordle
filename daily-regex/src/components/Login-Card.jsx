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
    console.log(password)
    console.log(username)
    const loginData = {
      username: username,
      password: password
    }
    axios.post('http://127.0.0.1:3000/auth/login', loginData).then((responce) => {
      if (responce.data) {
        // console.log(responce.data)
        document.cookie = `token=${responce.data}; path=/`;
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
    <p id='error'>{error}</p>
    <div id='login-button-container'>
      <button type='submit' id='login-button'>Login</button>
    </div>  
  </form>

  </div>
  );
}
 


export default LoginCard;