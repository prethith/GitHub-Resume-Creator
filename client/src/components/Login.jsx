import React from 'react';

const clientID = 'Ov23liVstDevmDfknQa7';
const redirectURI = 'http://localhost:3000/callback';

const Login = () => {
    const handleLogin = () => {
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&scope=user`;
    };

    return (
        <div>
            <h1>Login with GitHub</h1>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
