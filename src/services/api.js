import * as api from '../api/api.js';

export const apiService = {
    getUserByPhone: async (phone) => {
        try {
            return await api.getUserByPhone(phone);
        } catch (error) {
            console.error('Error in getUserByPhone:', error);
            throw error;
        }
    },
    updateUser: async (userId, userData) => {
        try {
            return await api.updateUser(userId, userData);
        } catch (error) {
            console.error('Error in updateUser:', error);
            throw error;
        }
    },
    createUser: async (userData) => {
        try {
            return await api.createUser(userData);
        } catch (error) {
            console.error('Error in createUser:', error);
            throw error;
        }
    }
};
