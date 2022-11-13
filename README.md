# employee-exam-rod-06101990

## .nvmrc

Para usar el archivo .nvmrc, es necesario tener instalado [nvm](https://github.com/nvm-sh/nvm) en el equipo, y, desde la raiz del proyecto, correr el siguiente comando para cambiar a la version de node que usa el proyecto.
Este archivo tambien indica la verdion de node con la que trabaje el proyecto.

  ``` bash
  nvm use
  ```

## Dependencias

Para isntalar las dependencias del proyecto, basta con correr `npm i` desde la raiz del mismo, este comando va a instalar primero las dependencias del cliente y luego las del servidor.

## Build

Para construit la aplicacion se debe correr el siguiente comando `npm run build` desde la raiz del mismo, este comando va a dejar una carpeta **dist/** en la raiz, la cual contiene el empaquetado del proyecto, tanto el server como la app.

## Run

Para correr el proyecto se deben considerar los siguientes casos:

### Develop

* Si se quiere corre tanto el servidor como el cliente al mismo tiempo, desde la raiz ejecutar:

  ``` bash
  npm run start:dev
  ```

* Si se quiere corre solo el servidor, desde la raiz ejecutar:

  ``` bash
  npm run server
  ```

* Si se quiere corre solo el cliente, desde **/client** ejecutar:

  ``` bash
  npm start
  ```

### production

* Si se quiere corre el proyecto construido, desde la raiz ejecutar:

  ``` bash
  npm run start:local
  ```

### Simulacion de Login

 Para hacer un login exitoso, las credenciales correctas son las siguientes, cualquier otro usuario o password, tirara un error.
 La sesion de login se esta almacenando en localStorage, asi que se puede recargar la app sin perder el login. Para cerrar sesion basta con hacer un logout desde el menu hamburguesa.

  | Clave | Valor |
  |-------|-------|
  | User | Rodrigo32 |
  | Pass | Password123 |

### Simulacion de agregar un usuario falso

 En la pantalla **/employees**, se puede simular la creacion incorrecta un un usuario con los siguientes datos.
 Si los el Nombre y Apellido, son iguales a los de abajo, el usuario no se agregara, simulando un error en el servicio, en caso contrario se agregara el usuario de forma local, y se perdera al recargar la pantalla.

  | Clave | Valor |
  |-------|-------|
  | Name | Pedro |
  | LastName | Picapiedra |
