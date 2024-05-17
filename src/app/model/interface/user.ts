import { FormControl } from "@angular/forms";


/**
 * Representa un usuario con todos los campos necesarios para el registro.
 */
export interface User {
    UsurioNombre:              string;
    Usuariocorreo_electronico: string;
    Usuariocontrasena:         string;
    UsuarioTelefono:           string;
}

/**
 * Representa un formulario de usuario para el registro,
 * donde cada campo es un FormControl.
 */
export interface UserForm {
    UsuarioNombre:              FormControl<string>;
    UsuarioApellido:            FormControl<string>;
    Usuariocorreo_electronico: FormControl<string>;
    Usuariocontrasena:         FormControl<string>;
    UsuarioRepetirContrasena:   FormControl<string>;
    UsuarioTelefono:           FormControl<string>;
}

/**
 * Representa un formulario de login de usuario,
 * donde cada campo es un FormControl.
 */
export interface UserLoginForm {
    Usuariocorreo_electronico: FormControl<string>;
    Usuariocontrasena:         FormControl<string>;
}

/**
 * Representa solo las propiedades necesarias para el login
 * extraídas de la interfaz User.
 */
export type UserLogin = Pick<User, 'Usuariocorreo_electronico' | 'Usuariocontrasena'>;


