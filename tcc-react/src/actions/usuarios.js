import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8080';
export const getUsers = async () => {
    try {
        const response = await axios.get('/usuarios/tipoUsuario');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Função para excluir um usuário pelo ID
export const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`/usuarios/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Função para excluir um usuário pelo ID
export const updateUser = async (user) => {
    try {
        const response = await axios.put(`/usuarios/${user.id}`, user);
        return response.data;
    } catch (error) {
        throw error;
    }
};
