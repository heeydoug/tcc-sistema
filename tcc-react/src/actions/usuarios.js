import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8080';

// ======================================================================
export const getUsers = async () => {
    try {
        const response = await axios.get('/usuarios/tipoUsuario');
        return response.data;
    } catch (error) {
        throw error;
    }
};
// ======================================================================
export const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`/usuarios/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
// ======================================================================
export const updateUser = async (user) => {
    try {
        const response = await axios.put(`/usuarios/${user.id}`, user);
        return response.data;
    } catch (error) {
        throw error;
    }
};
// ======================================================================
export const getClients = async () => {
    try {
        const response = await axios.get('/usuarios/tipoCliente');
        return response.data;
    } catch (error) {
        throw error;
    }
};
// ======================================================================
export const getWritter = async () => {
    try {
        const response = await axios.get('/usuarios/tipoRedator');
        return response.data;
    } catch (error) {
        throw error;
    }
};
// ======================================================================
export const getReviewer = async () => {
    try {
        const response = await axios.get('/usuarios/tipoRevisor');
        return response.data;
    } catch (error) {
        throw error;
    }
};
// ======================================================================
export const getAdmin = async () => {
    try {
        const response = await axios.get('/usuarios/tipoAdm');
        return response.data;
    } catch (error) {
        throw error;
    }
};
// ======================================================================