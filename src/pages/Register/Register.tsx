import { FormEvent, useState } from 'react';
import styles from '../Login/Login.module.css';
import { useForm } from '../../hooks/useForm';
import { useNavigate, Link } from 'react-router-dom';

export const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const { values, handleChange } = useForm({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { username, email, password, confirmPassword } = values;
  const navigate = useNavigate();

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Aquí irían las validaciones adicionales y la lógica para guardar el usuario
    // Por ahora simularemos un registro exitoso

    try {
      // Simulamos un fetch para registro (esto se reemplazaría con tu lógica real)
      // const response = await fetch('/api/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ username, email, password })
      // });

      // Simulamos una respuesta exitosa
      alert('Registro exitoso');
      navigate('/login'); // Redirigir al login después de un registro exitoso
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Error en el registro. Inténtalo de nuevo.');
    }
  };

  return (
    <div className={styles.containerLogin}>
      <div className={styles.containerForm}>
        <span style={{ fontSize: '10vh' }} className="material-symbols-outlined">
          person_add
        </span>
        <h2>Registro de Usuario</h2>

        <form onSubmit={handleSubmitForm}>
          <div className={styles.formGroup}>
            <label htmlFor="username">Nombre de Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleChange}
              placeholder="Nombre de usuario"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
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

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              type={showConfirmPass ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              placeholder="Confirmar contraseña"
              required
            />
          </div>

          <div className={styles.showPasswordContainer}>
            <input
              type="checkbox"
              id="showConfirmPassword"
              onChange={() => setShowConfirmPass(!showConfirmPass)}
              className={styles.checkbox}
            />
            <label htmlFor="showConfirmPassword" className={styles.showPasswordText}>Mostrar contraseña</label>
          </div>

          <div className={styles.submitContainer}>
            <button type="submit">Registrarse</button>
          </div>
          
          <div className={styles.loginLinkContainer}>
            <p>¿Ya tienes una cuenta?</p>
            <Link to="/login" className={styles.loginLink}>
              Iniciar Sesión
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};