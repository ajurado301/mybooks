export class Usuario {

    // Atributos
    public id_usuario: number;
    public nombre: string;
    public apellidos: string;
    public correo: string;
    public url: string;
    public password: string;

    // Constructor
    constructor(nombre: string, apellidos: string, correo: string, url: string, password: string, id_usuario: number = 0) {
        this.id_usuario = id_usuario;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.correo = correo;
        this.url = url;
        this.password = password;
    }
}
