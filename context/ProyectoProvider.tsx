import cliente from "@/config/client";
import {
  Config,
  IAlerta,
  IColaborador,
  IProyecto,
  ITarea,
} from "@/interfaces/interfaces";
import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Tarea from "@/components/Tarea/Tarea";

interface ProyectoProviderProps {
  children: React.ReactNode;
}

interface ProyectoContextProps {
  alerta: IAlerta;
  mostrarAlerta: (alerta: IAlerta) => void;
  proyectos: Array<IProyecto>;
  submitProyecto: (proyecto: IProyecto) => void;
  obtenerProyectos: (proyectos: Array<IProyecto>) => void;
  proyecto: IProyecto;
  conseguirProyecto: (proyectoActual: IProyecto) => void;
  eliminarProyecto: (id: string) => void;
  changeModal: () => void;
  modal: boolean;
  submitTarea: (tarea: ITarea) => Promise<void>;
  tarea: ITarea;
  asignarTarea: (tarea: ITarea) => void;
  eliminarTarea: (id: string) => void;
  modalEliminar: boolean;
  handleModalEliminar: (tarea: ITarea) => void;
  submitColaborador: (email: string) => Promise<void>;
  colaborador: IColaborador;
  cargando: boolean | null;
  asignarCargando: () => void;
  agregarColaborador: (obj: string, email: string) => void;
  modalEliminarColaborador: boolean;
  changeModalEliminarColaborador: (cola: IColaborador) => void;
  eliminarColaborador: (cola: IColaborador) => Promise<void>;
  completarTarea: (id: string) => Promise<void>;
}

const ProyectoContext = createContext<ProyectoContextProps>(
  {} as ProyectoContextProps
);

const INITIAL_STATE_PROYECTO: IProyecto = {
  cliente: "",
  descripcion: "",
  fechaEntrega: "",
  nombre: "",
};

const INITIAL_STATE_COLABORADOR: IColaborador = {
  _id: "",
  email: "",
  nombre: "",
};

const ProyectoProvider: React.FC<ProyectoProviderProps> = ({ children }) => {
  const [alerta, setAlerta] = useState<IAlerta>({ error: false, mensaje: "" });
  const [proyectos, setProyectos] = useState<Array<IProyecto>>([]);
  const [proyecto, setProyecto] = useState<IProyecto>(INITIAL_STATE_PROYECTO);
  const [modal, setModal] = useState<boolean>(false);
  const [tarea, setTarea] = useState<ITarea>({} as ITarea);
  const [modalEliminar, setModalEliminar] = useState<boolean>(false);
  const [colaborador, setColaborador] = useState<IColaborador>(
    INITIAL_STATE_COLABORADOR
  );
  const [cargando, setCargando] = useState<boolean | null>(null);
  const [modalEliminarColaborador, setModalEliminarColaborador] =
    useState<boolean>(false);
  const router = useRouter();

  function changeModal() {
    setModal(!modal);
  }

  const mostrarAlerta = (alerta: IAlerta) => {
    setAlerta(alerta);

    setTimeout(() => {
      setAlerta({
        error: false,
        mensaje: "",
      });
    }, 3000);
  };

  const submitProyecto = async (proyecto: IProyecto) => {
    if (proyecto._id) {
      await editarProyecto(proyecto);
    } else {
      await crearProyecto(proyecto);
    }
  };

  const editarProyecto = async (proyecto: IProyecto) => {
    try {
      const token = Cookies.get("token");
      const config: Config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await cliente.put(
        `/proyectos/${proyecto._id}`,
        proyecto,
        config
      );

      setAlerta({
        error: false,
        mensaje: "Proyecto editado correctamente",
      });

      setTimeout(() => {
        router.push("/proyectos");
        setAlerta({
          error: false,
          mensaje: "",
        });
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarProyecto = async (id: string) => {
    const token = Cookies.get("token");
    const config: Config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await cliente.delete(`/proyectos/${id}`, config);

      mostrarAlerta({
        error: false,
        mensaje: "Proyecto ha sido eliminado",
      });
      setTimeout(() => {
        router.push("/proyectos");
      }, 3000);
      await router.push("/proyectos");
    } catch (error) {
      console.log(error);
    }
  };

  const crearProyecto = async (proyecto: IProyecto) => {
    try {
      const token = Cookies.get("token");
      const config: Config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await cliente.post("/proyectos", proyecto, config);

      setAlerta({
        error: false,
        mensaje: "Proyecto creado correctamente",
      });

      setTimeout(() => {
        router.push("/proyectos");
        setAlerta({
          error: false,
          mensaje: "",
        });
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerProyectos = (proyectos: Array<IProyecto>) => {
    setProyectos([...proyectos]);
  };

  const conseguirProyecto = (proyecto: IProyecto) => {
    setProyecto(proyecto);
  };

  const submitTarea = async (tarea: ITarea) => {
    if (tarea._id) {
      await editarTarea(tarea);
    } else {
      await crearTarea(tarea);
    }
  };

  async function editarTarea(tarea: ITarea) {
    try {
      const token = Cookies.get("token");
      const config: Config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data: newTarea }: { data: ITarea } = await cliente.put(
        `/tareas/${tarea._id}`,
        tarea,
        config
      );

      if (proyecto.tareas) {
        const proyectoActualizado = { ...proyecto };
        proyectoActualizado.tareas = proyectoActualizado.tareas?.map(
          (tarea: ITarea) =>
            tarea._id === newTarea._id ? (tarea = newTarea) : tarea
        );

        setProyecto(proyectoActualizado);
      }

      changeModal();
    } catch (error: any) {
      console.warn(error);
      mostrarAlerta({
        error: true,
        mensaje: error?.response?.data?.msj,
      });
    }
  }

  async function crearTarea(tarea: ITarea) {
    try {
      const token = Cookies.get("token");
      const config: Config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data: newTarea } = await cliente.post("/tareas", tarea, config);

      mostrarAlerta({
        error: false,
        mensaje: "Proyecto creado correctamente",
      });

      if (proyecto.tareas) {
        const proyectoActualizado = { ...proyecto };
        proyectoActualizado.tareas = [...proyecto?.tareas, newTarea];
        conseguirProyecto(proyectoActualizado);
      }
    } catch (error: any) {
      console.log(error);
      mostrarAlerta({
        error: true,
        mensaje: error?.response?.data?.msj,
      });
    }
  }

  const asignarTarea = (tarea: ITarea) => {
    setTarea(tarea);
    changeModal();
  };

  const eliminarTarea = async (id: string) => {
    try {
      const token = Cookies.get("token");
      const config: Config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await cliente.delete(`/tareas/${id}`, config);
      console.log(data);

      const proyectoActualizado = { ...proyecto };
      proyectoActualizado.tareas = proyectoActualizado.tareas?.filter(
        (tarea: ITarea) => tarea._id !== id
      );
      setProyecto(proyectoActualizado);
    } catch (error: any) {
      console.log(error);
      mostrarAlerta({
        error: true,
        mensaje: error?.response?.data?.msj,
      });
    }
  };

  const handleModalEliminar = (tarea: ITarea) => {
    setTarea(tarea);
    setModalEliminar(!modalEliminar);
  };

  const submitColaborador = async (email: string) => {
    try {
      const token = Cookies.get("token");
      const config: Config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      setCargando(true);
      const { data } = await cliente.post(
        "/proyectos/colaboradores",
        { email },
        config
      );
      setColaborador(data);
      setAlerta({
        error: false,
        mensaje: "",
      });

      mostrarAlerta({
        error: false,
        mensaje: data.msj,
      });
    } catch (err: any) {
      console.log(err);

      mostrarAlerta({
        error: true,
        mensaje: err?.response?.data.msj,
      });
    } finally {
      setCargando(false);
    }
  };

  const agregarColaborador = async (id: string, email: string) => {
    try {
      const token = Cookies.get("token");
      const config: Config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await cliente.post(
        `/proyectos/colaboradores/${id}`,
        { email },
        config
      );
      setAlerta({
        error: false,
        mensaje: data.msj,
      });

      setColaborador(INITIAL_STATE_COLABORADOR);
    } catch (error: any) {
      setAlerta({
        error: true,
        mensaje: error.response.data.msj,
      });

      setColaborador(INITIAL_STATE_COLABORADOR);
    }
  };

  const asignarCargando = () => {
    setCargando(!cargando);
  };

  const changeModalEliminarColaborador = (cola: IColaborador) => {
    setModalEliminarColaborador(!modalEliminarColaborador);
    setColaborador(cola);
    //console.log(colaborador);
  };

  const eliminarColaborador = async (cola: IColaborador) => {
    try {
      const proyectoActualizado = { ...proyecto };

      proyectoActualizado.colaboradores =
        proyectoActualizado.colaboradores?.filter(
          (_colaborador: IColaborador) => _colaborador._id !== cola._id
        );

      setProyecto(proyectoActualizado);
      //console.log(proyecto)
      changeModalEliminarColaborador(colaborador);
    } catch (err) {
      console.log(err);
    }
  };

  const completarTarea = async (id: string): Promise<void> => {
    try {
      const token = Cookies.get("token");
      const config: Config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await cliente.post(`/tareas/estado/${id}`, {}, config);

      const proyectoActualizado = { ...proyecto };

      proyectoActualizado.tareas = proyectoActualizado.tareas?.map(
        (tareaState: ITarea) =>
          tareaState._id === data._id ? data : tareaState
      );

      setProyecto(proyectoActualizado);
      
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ProyectoContext.Provider
      value={{
        alerta,
        mostrarAlerta,
        proyectos,
        submitProyecto,
        obtenerProyectos,
        conseguirProyecto,
        proyecto,
        eliminarProyecto,
        modal,
        changeModal,
        submitTarea,
        asignarTarea,
        tarea,
        eliminarTarea,
        modalEliminar,
        handleModalEliminar,
        submitColaborador,
        colaborador,
        cargando,
        asignarCargando,
        agregarColaborador,
        modalEliminarColaborador,
        changeModalEliminarColaborador,
        eliminarColaborador,
        completarTarea,
      }}
    >
      {children}
    </ProyectoContext.Provider>
  );
};

export { ProyectoProvider, ProyectoContext };
