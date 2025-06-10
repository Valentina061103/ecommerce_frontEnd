import { useAuth } from '../../store/authContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './ProfilePage.module.css';
import { api } from '../../services/api';
import { User } from '../../types/IUser';


interface Direccion {
    id: number;
    calle: string;
    ciudad: string;
    provincia: string;
    pais: string;
    codigoPostal: string;
    localidad: string;
}

interface NewAddressFormData {
    calle: string;
    ciudad: string;
    provincia: string;
    pais: string;
    codigoPostal: string;
    localidad: string;
}

export const ProfilePage = () => {
    const { user, loadingUser, token, setUser } = useAuth();
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        nombre: user?.nombre || '',
        dni: user?.dni || '',
    });
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const [direcciones, setDirecciones] = useState<Direccion[]>([]);
    const [showAddAddressForm, setShowAddAddressForm] = useState(false);
    const [newAddressFormData, setNewAddressFormData] = useState<NewAddressFormData>({
        calle: '', ciudad: '', provincia: '', pais: '', codigoPostal: '', localidad: ''
    });
    const [addressError, setAddressError] = useState<string | null>(null);
    const [addressLoading, setAddressLoading] = useState(false);

    useEffect(() => {
        if (!loadingUser && !token) {
            navigate('/login');
            return;
        }
        if (user) {
            setFormData({
                nombre: user.nombre,
                dni: user.dni,
            });
        }
    }, [loadingUser, token, navigate, user]);

    useEffect(() => {
        const fetchDirecciones = async () => {
            if (user?.id && token) {
                try {
                    setAddressLoading(true);
                    const fetchedDirecciones = await api.get<Direccion[]>(`/direcciones/usuario/${user.id}`);
                    setDirecciones(fetchedDirecciones);
                } catch (err: any) {
                    console.error('Error al cargar direcciones:', err);
                    setAddressError("Error al cargar direcciones: " + (err.data?.message || err.message));
                } finally {
                    setAddressLoading(false);
                }
            }
        };

        if (user?.id) {
            fetchDirecciones();
        }
    }, [user, token]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);

        if (!user || !user.id) {
            setError("No se pudo obtener el ID del usuario para actualizar.");
            setIsLoading(false);
            return;
        }

        try {
            const updatedUserData = await api.put<User>('/usuarios/perfil', formData);

            setUser(updatedUserData);
            setSuccessMessage("Perfil actualizado exitosamente.");
            setIsEditing(false);
        } catch (err: any) {
            console.error('Error al actualizar el perfil:', err);
            const errorMessage = err.data?.message || err.message || "Error desconocido al actualizar.";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleNewAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewAddressFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddAddress = async (e: React.FormEvent) => {
        e.preventDefault();
        setAddressLoading(true);
        setAddressError(null);

        if (!user || !user.id) {
            setAddressError("ID de usuario no disponible.");
            setAddressLoading(false);
            return;
        }

        try {
            const nuevaDireccion = await api.post<Direccion>('/direcciones', newAddressFormData);

            const usuarioDireccionDTO = {
                usuarioId: user.id,
                direccionId: nuevaDireccion.id,
            };
            
            await api.post('/usuarios-direcciones', usuarioDireccionDTO);

            setDirecciones(prev => [...prev, nuevaDireccion]);
            setNewAddressFormData({ calle: '', ciudad: '', provincia: '', pais: '', codigoPostal: '', localidad: '' });
            setShowAddAddressForm(false);
            setSuccessMessage("Dirección agregada y vinculada exitosamente.");
        } catch (err: any) {
            console.error('Error al agregar dirección:', err);
            const errorMessage = err.data?.message || err.message || "Error desconocido al agregar.";
            setAddressError(errorMessage);
        } finally {
            setAddressLoading(false);
        }
    };

    const handleDeleteAddress = async (direccionId: number) => {
        if (!user || !user.id || !window.confirm('¿Estás seguro de que quieres eliminar esta dirección?')) {
            return;
        }
        setAddressLoading(true);
        setAddressError(null);

        try {
            
            await api.delete(`/usuarios-direcciones?usuarioId=${user.id}&direccionId=${direccionId}`);

            setDirecciones(prev => prev.filter(dir => dir.id !== direccionId));
            setSuccessMessage("Dirección eliminada exitosamente.");
        } catch (err: any) {
            console.error('Error al eliminar dirección:', err);
            const errorMessage = err.data?.message || err.message || "Error al eliminar dirección: " + (err.data?.message || err.message);
            setAddressError(errorMessage);
        } finally {
            setAddressLoading(false);
        }
    };

    if (loadingUser || !user) {
        return (
            <div className={styles.container}>
                <p>Cargando información del perfil...</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.profileCard}>
                <h2>Mi Perfil</h2>

                {error && <p className={styles.errorMessage}>{error}</p>}
                {successMessage && <p className={styles.successMessage}>{successMessage}</p>}

                {isEditing ? (
                    <form onSubmit={handleSubmit} className={styles.profileForm}>
                        <div className={styles.formGroup}>
                            <label htmlFor="nombre">Nombre:</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="dni">DNI:</label>
                            <input
                                type="text"
                                id="dni"
                                name="dni"
                                value={formData.dni}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.formActions}>
                            <button type="submit" disabled={isLoading} className={styles.saveButton}>
                                {isLoading ? 'Guardando...' : 'Guardar Cambios'}
                            </button>
                            <button type="button" onClick={() => setIsEditing(false)} className={styles.cancelButton}>
                                Cancelar
                            </button>
                        </div>
                    </form>
                ) : (
                    <>
                        <div className={styles.profileDetail}>
                            <strong>Nombre:</strong>
                            <p>{user.nombre}</p>
                        </div>
                        <div className={styles.profileDetail}>
                            <strong>Email:</strong>
                            <p>{user.email}</p>
                        </div>
                        <div className={styles.profileDetail}>
                            <strong>DNI:</strong>
                            <p>{user.dni}</p>
                        </div>
                        <div className={styles.profileDetail}>
                            <strong>Rol:</strong>
                            <p>{user.rol}</p>
                        </div>
                        <button className={styles.editButton} onClick={() => setIsEditing(true)}>
                            Editar Perfil
                        </button>
                    </>
                )}

                <hr className={styles.separator} />

                <h3>Mis Direcciones</h3>
                {addressLoading && <p>Cargando direcciones...</p>}
                {addressError && <p className={styles.errorMessage}>{addressError}</p>}

                {direcciones.length === 0 && !addressLoading ? (
                    <p>No tienes direcciones guardadas.</p>
                ) : (
                    <div className={styles.addressList}>
                        {direcciones.map(dir => (
                            <div key={dir.id} className={styles.addressItem}>
                                <p>{dir.calle}, {dir.localidad}, {dir.ciudad}, {dir.provincia}, {dir.pais} ({dir.codigoPostal})</p>
                                <button
                                    onClick={() => handleDeleteAddress(dir.id)}
                                    className={styles.deleteAddressButton}
                                    disabled={addressLoading}
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {!showAddAddressForm && (
                    <button onClick={() => setShowAddAddressForm(true)} className={styles.addAddressButton}>
                        Agregar Nueva Dirección
                    </button>
                )}

                {showAddAddressForm && (
                    <form onSubmit={handleAddAddress} className={styles.addressForm}>
                        <h4>Nueva Dirección</h4>
                        <div className={styles.formGroup}>
                            <label htmlFor="calle">Calle:</label>
                            <input type="text" name="calle" id="calle" value={newAddressFormData.calle} onChange={handleNewAddressChange} required />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="localidad">Localidad:</label>
                            <input type="text" name="localidad" id="localidad" value={newAddressFormData.localidad} onChange={handleNewAddressChange} required />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="ciudad">Ciudad:</label>
                            <input type="text" name="ciudad" id="ciudad" value={newAddressFormData.ciudad} onChange={handleNewAddressChange} required />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="provincia">Provincia:</label>
                            <input type="text" name="provincia" id="provincia" value={newAddressFormData.provincia} onChange={handleNewAddressChange} required />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="pais">País:</label>
                            <input type="text" name="pais" id="pais" value={newAddressFormData.pais} onChange={handleNewAddressChange} required />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="codigoPostal">Código Postal:</label>
                            <input type="text" name="codigoPostal" id="codigoPostal" value={newAddressFormData.codigoPostal} onChange={handleNewAddressChange} required />
                        </div>
                        <div className={styles.formActions}>
                            <button type="submit" disabled={addressLoading} className={styles.saveButton}>
                                {addressLoading ? 'Guardando...' : 'Guardar Dirección'}
                            </button>
                            <button type="button" onClick={() => setShowAddAddressForm(false)} className={styles.cancelButton}>
                                Cancelar
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};