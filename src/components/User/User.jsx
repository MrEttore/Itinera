import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';
import Button from '../Button/Button';
import styles from './User.module.css';

function User() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [avatarLoaded, setAvatarLoaded] = useState(false);

    function handleClick() {
        logout();
        navigate('/');
    }

    return (
        <div className={styles.user}>
            <div className={styles.avatarWrapper}>
                {!avatarLoaded && (
                    <div
                        className={styles.avatarSpinner}
                        aria-label="Loading avatar"
                    />
                )}
                <img
                    src={user.avatar}
                    alt={user.name}
                    onLoad={() => setAvatarLoaded(true)}
                    className={
                        avatarLoaded
                            ? styles.avatarVisible
                            : styles.avatarHidden
                    }
                />
            </div>
            <span>Welcome, {user.name}</span>
            <Button type="logout" onClick={handleClick}>
                Logout
            </Button>
        </div>
    );
}

export default User;
