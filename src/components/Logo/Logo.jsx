import { Link } from 'react-router-dom';

import styles from './Logo.module.css';

function Logo() {
    return (
        <Link to="/" className={styles.brand}>
            <img src="/logo.svg" alt="Itinera logo" className={styles.logo} />
            <span className={styles.wordmark}>ITINERA</span>
        </Link>
    );
}

export default Logo;
