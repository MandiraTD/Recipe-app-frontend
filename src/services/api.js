import axios from "axios";


const API = axios.create({
    baseURL: "http://16.171.153.121:5000/api",
});


API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;
