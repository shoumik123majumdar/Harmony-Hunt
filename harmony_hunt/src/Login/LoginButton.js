import axios from 'axios';
import connect_with_spotify from './connect-with-spotify.png';
import {useNavigate} from 'react-router-dom'

const LoginButton = () => {
    
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/get-random-song-info');
            navigate('/game', {state:{loginData:response.data}})
        } catch (error) {
            console.error("Failed to login:", error.message);
        }
        
    };
    
    return (<button onClick={handleLogin}>
        <img src={connect_with_spotify} className="Connect-with-spotify" width="250" height="50" alt="Connect with spotify" />
        </button>)
};

export default LoginButton;