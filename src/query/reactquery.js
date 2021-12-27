import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';

import axios from './axios';
import { setUser } from '../redux/authSlice';

export function useLogin() {
    return useMutation('useLogin', ({ email, password }) =>
        axios.post(`/login`, { email, password }), {
        onSuccess: ({ data }) => {
            localStorage.setItem('token', data);
        },
    });
}

export function useUser() {
    const dispatch = useDispatch();
    return useMutation('useUser', (token) =>
        axios.get(`/me`, { headers: { 'Authorization': `Bearer ${token}` } }), {
        onSuccess: async ({ data }) => {
            await dispatch(setUser(data));
        },
    });
}

export function useRegister() {
    return useMutation('useRegister', (formData) =>
        axios.post(`/register`, formData), {
        onSuccess: ({ data }) => {
            localStorage.setItem('token', data);
        },
        onError: (error) => {
            console.log({ message: error.response.data });
        }
    });
}

export function useUserUpdate() {
    return useMutation('useUserUpdate', ({ firstName, lastName, education, hobbies }) =>
        axios.patch(`/update`, { firstName, lastName, education, hobbies }, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }), {});
}

export function useNewPassword() {
    return useMutation('useNewPassword', ({ currentPassword, newPassword, confirmPassword }) =>
        axios.patch(`/password`, { currentPassword, newPassword, confirmPassword }, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }), {});
}