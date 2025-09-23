import { useNavigate } from 'react-router-dom';

import styles from './Button.module.css';

export default function Button({ children, onClick, type }) {
    const navigate = useNavigate();

    if (type === 'back')
        return (
            <button
                onClick={(e) => {
                    e.preventDefault();
                    navigate(-1);
                }}
                className={`${styles.btn} ${styles[type]}`}
            >
                {children}
            </button>
        );

    return (
        <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
            {children}
        </button>
    );
}
