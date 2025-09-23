import { useNavigate } from 'react-router-dom';

import styles from './User.module.css';
import { useAuth } from '../../context/AuthContext';
import Button from '../Button/Button';

function User() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleClick() {
    logout();
    navigate('/');
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <Button type="logout" onClick={handleClick}>
        Logout
      </Button>
    </div>
  );
}

export default User;
