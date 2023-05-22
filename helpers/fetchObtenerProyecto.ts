import cliente from "@/config/client";

export async function FetchObtenerProyecto(id: string, token: string){
    const result = {
        _error: null,
        _proyecto: null,
        _id: id?.toString() ?? "",
      };
    
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
    
        const { data } = await cliente.get(`/proyectos/${id}`, config);
    
        result._proyecto = data;
      } catch (error : any) {
        result._error = error?.response?.data ?? "Error Inesperado";
      }
    
      return result;
} 