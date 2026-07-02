export declare class User {
    id: number;
    nombre: string;
    email: string;
    password: string;
    numeroIdentificacion: string;
    direccionResidencia: string;
    paisResidencia: string;
    parent: User;
    children: User[];
}
