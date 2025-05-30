export type Rol = "USUARIO" | "ADMIN";

export interface IUser {
    id: number;
    nombre: string;
    email: string;
    password: string;
    dni: string;
    rol: Rol;
    activo: boolean;
    direccionId: number;
    direcciones: any[]; // despues hay que revisar esto
    ordenes: any[];
    fechaCreacion: string;
    fechaActualizacion: string;
}
