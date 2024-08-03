import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserData = () => {
    const { username } = useParams();
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('github_token');
            if (!token) {
                setError('Not authenticated');
                return;
            }

            try {
                const response = await axios.get(`https://api.github.com/users/${username}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUserData(response.data);
            } catch (err) {
                setError('User not found');
                setUserData(null);
            }
        };

        fetchUserData();
    }, [username]);

    return (
        <div>
            {error && <p>{error}</p>}
            {userData && (
                <div>
                    <h2>{userData.name}</h2>
                    <img src={userData.avatar_url} alt={`${userData.name}'s avatar`} width="100" />
                    <p>Username: {userData.login}</p>
                    <p>Public Repos: {userData.public_repos}</p>
                    <p>Followers: {userData.followers}</p>
                    <p>Following: {userData.following}</p>
                    <p>Bio: {userData.bio}</p>
                </div>
            )}
        </div>
    );
};

export default UserData;
