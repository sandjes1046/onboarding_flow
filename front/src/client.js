import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  header: {
    'Content-Type': 'applicationS/json',
    Accept: 'application/json',
  },
});

export default client;
