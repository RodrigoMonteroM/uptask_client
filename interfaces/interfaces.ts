import { type } from "os";

export interface IUsuario {
  _id?: string
  nombre: string;
  password: string;
  email: string;
  token: string;
  confirmado: boolean;
}

export interface IColaborador{
  _id: string;
  email: string;
  nombre: string
}


export interface IColaborador{
  _id: string;
  nombre: string;
  email: string;
}

export interface IAlerta {
  error: boolean;
  mensaje: string;
}

export interface IProyecto {
  nombre: string;
  fechaEntrega: string;
  descripcion: string;
  cliente: string;
  creador?: string;
  colaboradores?: Array<IColaborador>;
  tareas?: Array<ITarea>
  _id?: string;
}

export interface Config {
  headers: {
    "Content-Type": "application/json";
    Authorization: string;
  };
}

export interface IFechProyectoProps {
  _proyecto: IProyecto | null;
  _error: any;
  _id: string;
  _token?: string;
}

export interface ModalProps {
  modal: boolean;
  setModal: () => void;
}

export interface ITarea {
  _id?: string
  nombre: string;
  descripcion: string;
  estado?: boolean
  fechaEntrega: string;
  prioridad: "" | "Baja" | "Media" | "Alta";
  proyecto?: string;
  completado?: IUsuario
}
