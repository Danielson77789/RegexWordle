import '../css/nav-bar.css'
import { useNavigate } from 'react-router-dom';

function NavBar() {
    const navigate = useNavigate();

    const handleClick = () => {
        document.cookie = `token=; path=/`;
        navigate('/')
    }

    return(
        <div id="nav-bar-body">
            <button id='score-button' onClick={handleClick}> Scoreboard </button>
            <button id='log-out-button' onClick={handleClick}> Log-out </button>
        </div>
    )
}

export default NavBar;