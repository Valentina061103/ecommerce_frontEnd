import { FormEvent, useState } from 'react';
import styles from '../Login/Login.module.css';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../services/authService';
import { useAuth } from '../../store/authContext';

export const RegisterPage = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [generalError, setGeneralError] = useState('');

  //mensaje de exito
  const [successMessage, setSuccessMessage] = useState('');

  const { setToken, setUser } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!nombre.trim()) newErrors.nombre = 'El nombre es obligatorio.';
    if (!dni.trim()) newErrors.dni = 'El DNI es obligatorio.';
    if (!email.trim()) {
      newErrors.email = 'El correo es obligatorio.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'El correo no es válido.';
    }
    if (!password) newErrors.password = 'La contraseña es obligatoria.';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGeneralError('');

    if (!validateForm()) return;

    try {
      const res = await register({ nombre, email, password, dni });
      setToken(res.jwt);
      setUser({
        nombre: res.nombre,
        email: res.email,
        dni: res.dni,
        rol: res.rol
      })
      //mensaje de exito
      setSuccessMessage('Registro exitoso');
      setTimeout(() => {
        navigate('/');
      }, 1500);

    } catch (err: any) {
      console.error('Error al registrar:', err);
      setGeneralError(err.message || 'Error al registrar. Intenta de nuevo.');
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
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre completo"
              required
            />
            {errors.nombre && <span className={styles.error}>{errors.nombre}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="dni">DNI</label>
            <input
              type="text"
              id="dni"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              placeholder="DNI"
              required
            />
            {errors.dni && <span className={styles.error}>{errors.dni}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              required
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Contraseña</label>
            <input
              type={showPass ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
            {errors.password && <span className={styles.error}>{errors.password}</span>}
          </div>

          <div className={styles.showPasswordContainer}>
            <input
              type="checkbox"
              id="showPassword"
              onChange={() => setShowPass(!showPass)}
              className={styles.checkbox}
            />
            <label htmlFor="showPassword" className={styles.showPasswordText}>
              Mostrar contraseña
            </label>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              type={showConfirmPass ? 'text' : 'password'}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmar contraseña"
              required
            />
            {errors.confirmPassword && (
              <span className={styles.error}>{errors.confirmPassword}</span>
            )}
          </div>

          <div className={styles.showPasswordContainer}>
            <input
              type="checkbox"
              id="showConfirmPassword"
              onChange={() => setShowConfirmPass(!showConfirmPass)}
              className={styles.checkbox}
            />
            <label htmlFor="showConfirmPassword" className={styles.showPasswordText}>
              Mostrar contraseña
            </label>
          </div>

          {generalError && <p className={styles.error}>{generalError}</p>}

          <div className={styles.submitContainer}>
            <button type="submit">Registrarme</button>
          </div>

          <div className={styles.registerContainer}>
            <p>¿Ya tienes una cuenta?</p>
            <Link to="/login" className={styles.registerButton}>
              Iniciar sesión
            </Link>
          </div>
        </form>
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </div>
    </div>
  );
};