import styles from '../Login/Login.module.css';
import { FormEvent, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { register } from '../../services/authService';

export const Register = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
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
  
    if (!validateForm()) return;
  
    try {
      const { token } = await register({ nombre, email, password, dni });
  
      setToken(token);
      setUser({ nombre, email, dni }); // coincide con IUser , porque guada datos parciales
  
      navigate('/home');
    } catch (error) {
      console.error('Error al registrar:', error);
      alert('Error al registrar');
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
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre de usuario"
              required
            />
            {errors.nombre && <span className={styles.error}>{errors.nombre}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>DNI</label>
            <input
              type="text"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
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

          <button type="submit" className={styles.buttonLogin}>
            Registrarme
          </button>

          <p className={styles.registerText}>
            ¿Ya tenés cuenta? <Link to="/">Iniciá sesión</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
