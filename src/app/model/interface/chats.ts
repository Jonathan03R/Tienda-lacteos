export interface Empleado {
  EmpleadoCodigo: number;
  Empleadonombre: string;
  Empleadoapellidos: string;
  Empleadoemail: string;
}

export interface Mensaje {
  mensajesId: number;
  mensajesTexto: string;
  user: number;
  mensajestimestamp: string;
}

export interface ClienteConMensajes {
  ClienteDNI: string;
  mensajes: Mensaje[];
}

export interface ClienteConEmpleado {
  ClienteDNI: string;
  Empleado: Empleado;
  Mensajes: Mensaje[];
}
