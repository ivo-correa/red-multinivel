
export class CreateUserDto {
  //nombre: string;
  email: string;
  
  // Campos opcionales (nullable en la base de datos)
  nombre?: string; 
  numeroIdentificacion?: string;
  direccionResidencia?: string;
  paisResidencia?: string;
  telefono?: string;
  ciudad?: string;
  relacionCliente?: string;
  trabaja?: string;
  tipoOcupacion?: string;
  conoceRoyalPrestige?: string;
  agendado?: string;
  fechaAgenda?: Date;
  visitado?: string;
  fechaVisita?: Date;
  realizoCompra?: string;
  valorCompra?: number;
  notasAdicionales?: string;
  
  // Campo necesario para la estructura de árbol (referidos)
  sponsorId?: string;
}
