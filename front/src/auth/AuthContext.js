import React, {createContext, useContext, useEffect, useState} from 'react';
import axios from '../config/axiosConfig';
import AuthReq from '../config/AuthReq';
import AuthRes from '../config/AuthRes';

const AuthContext = createContext({});

const AuthProvider = ({children}) => {
    const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
    const [authRes, setAuthRes] = useState(new AuthRes());
    const [userEmail, setUserEmail] = useState('');
    const [error, setError] = useState('');

    const login = async (email, password) => {
        try {
            const request = new AuthReq(email, password);
            const response = await axios.post('/auth/login', request);
            const authRes = new AuthRes(response.data.token, response.data.user);

            setAuthRes(authRes);
            localStorage.setItem('authRes', JSON.stringify(authRes));

            localStorage.setItem('token', response.data.token);
            setUserEmail(response.data.user.email);
            localStorage.setItem('userEmail', response.data.user.email);

            setLoggedIn(true);
            localStorage.setItem('isLoggedIn', 'true');

            setError('');

        } catch (error) {
            if (error.response && error.response.status === 403) {
                setError('Nieprawidłowy email bądź hasło');
            } else {
                setError(error.response ? error.response.data.message : 'Login error');
                console.error("Login error", error.response ? error.response.data : error.message);
            }
        }
    };

    const register = async (name, surname, email, password) => {
        try {
            const response = await axios.post('/auth/register', {
                name,
                surname,
                email,
                password
            });
            const authRes = new AuthRes(response.data.token, response.data.user);

            setAuthRes(authRes);
            localStorage.setItem('authRes', JSON.stringify(authRes));

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userEmail', response.data.user.email);

            setLoggedIn(true);
            localStorage.setItem('isLoggedIn', 'true');

            setError('');
        } catch (error) {
            if (error.response.status === 403) {
                setError('Użytkownik o podanym adresie e-mail już istnieje');
            } else {
                setError(error.response ? error.response.data.message : 'Login error');
                console.error("Login error", error.response ? error.response.data : error.message);
            }
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('userEmail');
        if (typeof storedUser === 'string' && storedUser.trim() !== '') {
            setUserEmail(storedUser);
            setLoggedIn(true);
            const storedAuthRes = JSON.parse(localStorage.getItem('authRes'));
            setAuthRes(storedAuthRes);
        }
    }, []);


    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        setLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('authRes')
        setAuthRes(null);
    };

    return (
        <AuthContext.Provider value={{isLoggedIn, userEmail, setError, authRes, error, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};
