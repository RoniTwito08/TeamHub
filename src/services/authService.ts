import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';

export const loginUser = async (userData: {username: string, password: string}) => {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
}

export const registerUser = async (userData: {username: string, password: string}) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
}

