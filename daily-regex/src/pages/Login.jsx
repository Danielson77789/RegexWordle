import { useEffect } from "react";
import LoginCard from "../components/Login-Card";
import { useNavigate } from 'react-router-dom';
import '../css/login-page.css'

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
      return parts.pop().split(';').shift();
  }
  return null;
}

function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (getCookie('token')) {
      navigate('game-page')
    }
  })


  useEffect(() => {
    const canvas = document.getElementById('background-canvas');
    const ctx = canvas.getContext('2d');

    function initializeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    initializeCanvas();

    let letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ';
    letters = letters.split('');

    const fontSize = 10;
    let columns = canvas.width / fontSize;
    let drops = Array.from({ length: columns }).fill(1);

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0f0';
      drops.forEach((drop, i) => {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        drops[i]++;
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
          drops[i] = 0;
        }
      });
    }

    const interval = setInterval(draw, 33);

    // Handle resize
    function resize() {
      initializeCanvas();
      columns = canvas.width / fontSize;
      drops = Array.from({ length: columns }).fill(1);
    }
    window.addEventListener('resize', resize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, []);


  return(
    <>
    <canvas id="background-canvas"></canvas>
    <div id="body-div">
      <h1 id="login-title">Daily Wordle</h1>
      <LoginCard/>
    </div>
    
    </>
  )
}

export default LoginPage;