const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const CLIENT_ID = 'Ov23liVstDevmDfknQa7';
const CLIENT_SECRET = 'e0d44e9472a7b96c31b8aea11ad7bac95c12c60b';

app.post('/oauth/github', async (req, res) => {
    const { code } = req.body;

    try {
        const response = await axios.post(
            `https://github.com/login/oauth/access_token`,
            {
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                code,
            },
            {
                headers: {
                    accept: 'application/json',
                },
            }
        );

        const accessToken = response.data.access_token;
        res.json({ accessToken });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch access token' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
