import axios from "axios";
axios.interceptors.request.use( // 请求发出之前
    config => {
        const token = localStorage.getItem('token');
        config.headers.Authorization = `Bearer ${token}`
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
axios.interceptors.response.use( // 响应返回之前
    response => {
        const { authorization } = response.headers;
        if (authorization) {
            localStorage.setItem('token', authorization);
        }
        return response;
    },
    error => {
        if (error.response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '#/login';
        }
        return Promise.reject(error);
    }
);