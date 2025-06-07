import { FormEvent, useState } from 'react';
import styles from './Login.module.css';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../store/authContext';
import { login } from '../../services/authService';

export const LoginPage = () => {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken, setUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  //mensaje de exito
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      setToken(res.jwt);

      console.log('Respuesta del backend al login:', res);

      //devuelve los datos junto con token
      setUser({
        nombre: res.nombre,
        email: res.email,
        dni: res.dni,
        rol: res.rol,
      });


      //mensaje de exito
      setSuccessMessage('Inicio de sesión exitoso');
      setTimeout(() => {
        navigate('/');
      }, 1500);

    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión. Inténtalo de nuevo.');
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
            <label htmlFor="email">Usuario</label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
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
              onChange={(e) => setPassword(e.target.value)}
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

          {error && <p style={{ color: 'red' }}>{error}</p>}

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
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </div>
    </div>
  );
};
