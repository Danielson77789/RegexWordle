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
        navigate('game-page')
      }
    }).catch((err) => {
      setError(err.response.data.error)
    })
  }

  return(<div id='base-login-card'>

    <h2>Login form</h2>

    <form onSubmit={handleLogin}>
      <div id='input-field-container'>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username-input"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password-input"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <p id='error'>{error}</p>
      <button type='submit' id='login-button'>Login</button>
    </form>

  </div>
  );
}
 


export default LoginCard;