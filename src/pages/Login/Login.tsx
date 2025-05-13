import { FormEvent, useState } from 'react';
import styles from './Login.module.css';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';


export const Login = () => {
  const [showPass, setShowPass] = useState(false);

  const [values, setValues] = useState({
    user: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const { user, password } = values;

  // Ajusta esto según la estructura de tu store
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Aquí iría tu lógica de autenticación
    // Por ejemplo:
    try {
      const response = await fetch('/user.json');
      const usersData = await response.json();

      const userFound = usersData.users.find(
        (u: { username: string; password: string }) =>
          u.username === user && u.password === password
      );

      if (userFound) {
        login(user);
        navigate('/Home');
      } else {
        alert('Usuario o contraseña incorrecta');
      }
    } catch (error) {
      console.error('Error en el login:', error);
      alert('Error al iniciar sesión. Inténtalo de nuevo.');
    }
  };

  return (
    <div className={styles.containerLogin}>
      <div className={styles.containerForm}>
        <span style={{ fontSize: '10vh' }} className="material-symbols-outlined">
          person
        </span>
        <h2>Iniciar Sesión</h2>

        <form onSubmit={handleSubmitForm}>
          <div className={styles.formGroup}>
            <label htmlFor="user">Usuario</label>
            <input
              type="text"
              id="user"
              name="user"
              value={user}
              onChange={handleChange}
              placeholder="Usuario"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Contraseña</label>
            <input
              type={showPass ? 'text' : 'password'}
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Contraseña"
              required
            />
          </div>

          <div className={styles.showPasswordContainer}>
            <input
              type="checkbox"
              id="showPassword"
              onChange={() => setShowPass(!showPass)}
              className={styles.checkbox}
            />
            <label htmlFor="showPassword" className={styles.showPasswordText}>Mostrar contraseña</label>
          </div>
          <div className={styles.submitContainer}>
            <button type="submit">Ingresar</button>
          </div>
          
          <div className={styles.registerContainer}>
            <p>¿No tienes una cuenta?</p>
            <Link to="/register" className={styles.registerButton}>
              Registrarse
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};