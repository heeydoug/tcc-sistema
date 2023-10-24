import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8080';

// ======================================================================
export const getArticles = async () => {
    try {
        const response = await axios.get('/artigos');
        return response.data;
    } catch (error) {
        throw error;
    }
};
// ======================================================================