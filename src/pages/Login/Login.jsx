import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button } from '../../components';
import PageNav from '../../components/PageNav/PageNav';
import { useAuth } from '../../context/AuthContext';
import styles from './Login.module.css';

export default function Login() {
    const [email, setEmail] = useState('John.Doe@example.com');
    const [password, setPassword] = useState('qwerty');

    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        if (email && password) login(email, password);
    }

    useEffect(() => {
        if (isAuthenticated) navigate('/app', { replace: true });
    }, [isAuthenticated, navigate]);

    return (
        <main className={styles.login}>
            <PageNav />
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.row}>
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>

                <div className={styles.row}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>

                <div>
                    <Button type="login">Login</Button>
                </div>
            </form>
        </main>
    );
}
