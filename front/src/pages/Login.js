import React, {useState} from 'react';
import {useAuth} from '../auth/AuthContext';

const LoginForm = () => {
    const {login, error} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className="form-container">
            <div className="login-form">
                {error && <div className="text-danger">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="login-email">Adres e-mail</label>
                        <input
                            id="login-email"
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="login-password">Hasło</label>
                        <input
                            id="login-password"
                            type="password"
                            className="form-control"
                            placeholder="Hasło"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Zaloguj się
                    </button>

                </form>
            </div>
        </div>
    );
};

export default LoginForm;
