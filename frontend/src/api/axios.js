import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND || "http://localhost:3000/api/v1";

const client = axios.create({
    baseURL,
    withCredentials: true
});

export default client;