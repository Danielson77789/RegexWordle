import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import NavBar from "../components/NavBar";
import '../css/nav-bar.css'

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
        if (!getCookie('token')) {
          navigate('/')
        }
      })

    return(
        <div id="game-page-body">
            <NavBar id="nav-bar"></NavBar>
            <h1>
                Logged in
            </h1>
        </div>
    )
}

export default LoginPage;