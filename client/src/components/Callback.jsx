import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Callback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAccessToken = async (code) => {
            try {
                const response = await axios.post('http://localhost:5000/oauth/github', { code });
                const accessToken = response.data.accessToken;
                localStorage.setItem('github_token', accessToken);
                navigate('/home');
            } catch (err) {
                console.error('Error fetching access token', err);
            }
        };

        const code = new URLSearchParams(window.location.search).get('code');
        if (code) {
            fetchAccessToken(code);
        }
    }, [navigate]);

    return <div>Loading...</div>;
};

export default Callback;
