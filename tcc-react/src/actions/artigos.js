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
export const createArticle = async (artigoData) => {
    try {
        const response = await axios.post('/artigos', artigoData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
// ======================================================================
export const updateArticle = async (idDoArtigo, artigoData) => {
    try {
        const response = await axios.put(`/artigos/${idDoArtigo}`, artigoData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
// ======================================================================
