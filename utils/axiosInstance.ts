import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production' ? 'https://api.soundweave.dk/' : 'http://127.0.0.1:3000/';

export default axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});