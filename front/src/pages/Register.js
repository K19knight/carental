import React, {useEffect, useState} from 'react';
import {useAuth} from '../auth/AuthContext';

const Register = () => {
    const {register, error, setError} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register(name, surname, email, password);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    useEffect(() => {
        return () => {
            setError('');
        };
    }, [setError]);


    return (
        <div className="form-container">
            <div className="login-form">
                {error && <div className="text-danger">{error}</div>}
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label htmlFor="register-name">Imię</label>
                        <input
                            id="register-name"
                            type="text"
                            className="form-control"
                            placeholder="Imię"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="register-surname">Nazwisko</label>
                        <input
                            id="register-surname"
                            type="text"
                            className="form-control"
                            placeholder="Nazwisko"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="register-email">Adres e-mail</label>
                        <input
                            id="register-email"
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="register-password">Hasło</label>
                        <input
                            id="register-password"
                            type="password"
                            className="form-control"
                            placeholder="Hasło"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Zarejestruj się
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
