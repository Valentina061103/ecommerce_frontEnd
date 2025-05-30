
export interface ILogin {
    email: string;
    password: string;
}

export interface IRegister {
    nombre: string;
    email: string;
    password: string;
    dni: string;
}

export interface IToken {
    token: string;
}
