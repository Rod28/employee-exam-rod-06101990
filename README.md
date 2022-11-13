# Server template

# -------git config core.hooksPath .githooks

&nbsp;

## .nvmrc

Para usar el archivo .nvmrc, es necesario tener instalado [nvm](https://github.com/nvm-sh/nvm) en el equipo, y, desde la raiz del proyecto, correr el siguiente comando para cambiar a la version de node que usa el proyecto.

  ``` # bash / zsh
  nvm use
  ```

**NOTA:** Si la version a la que se desea cambiar, no esta instalada en nvm, basta con correr el siguiente comando para instalarla.

  ``` # bash / zsh
  nvm install version

  # Example: nvm install 16.13.0, nvm install 12.22.1, etc
  ```

&nbsp;

## Start app and server

Para levantar el servidor con node y react, se necesita correr el siguiente comando desde la raiz del proyecto.
Esto corre ambas aplicaciones desde una sola terminal y con un solo proceso.

  ``` # bash / zsh
  npm run start:dev
  ```

&nbsp;

## DigitalOcean Deployment

Este proyecto esta configurado para desplegarse desde un droplet de [DigitalOcean](https://www.digitalocean.com/try/developer-brand?utm_campaign=armx_brand_kw_en_cpc&utm_adgroup=digitalocean_exact_exact&_keyword=digitalocean&_device=c&_adposition=&utm_content=conversion&utm_medium=cpc&utm_source=google&gclid=EAIaIQobChMI76n-zM2j9wIV3xatBh24ug-cEAAYASAAEgIFJvD_BwE). Una vez creado el droplet y dentro de el, vamos a crear un usuario para que desde el, se cargue el proyecto y todos los demas programas.

Para entrar al droplet desde la terminal de nuestro equipo local

  ``` # bash / zsh
  ssh root@<ip_server>
  ```

**NOTA:** Si la llave ssh que se agrego al droplet a la hora de crearlo, tenia password, ese mismo password de la llave ssh, es el que se usara para abrir la conexion con el droplet por ssh.

Lo primero que se debe hacer una vez dentro del dropet, es actualizar los paquetes.

  ``` # bash / zsh
  # Actualizar la lista de repositorios del servidor
  sudo apt update

  # Actualizar el software
  sudo apt upgrade
  ```

Para crear el usario y agregar sus permisos, se ejecutan los siguientes comandos. Para este ejemplo, el usuario que se va a crear es ro, pero para crear otro usuario solo es necesario reemplazar ese nombre.

  ``` # bash / zsh
  # Crear usuario
  adduser ro

  # Agregar a la lista de usuarios para dar privilegios para instalar nuevos programas
  usermod -aG sudo ro

  # Para que el usuario se pueda conectar a traves de ssh
  # Se copia la carpeta ssh del usuario root al usuario ro
  rsync --archive --chown=ro:ro ~/.ssh /home/ro
  ```

Ahora se va a agregar este nuevo usuario y la ip del servidor a la configuracion ssh de nuestra maquina local, esto para que se cree un alias para conectarse al servidor desde nuestra terminal.

  ``` # bash / zsh
  # Se crea archivo de configuracion ssh
  vim ~/.ssh/config

  # Se agrega alias y permisos de conexion
  # Se pueden agregar mas de un Host en este archivo
  Host <alias>
      HostName <ip_server>
      User ro

  # Para conectarse al droplet desde la terminal
  ssh alias
  ```

* ### ufw

  Configurar un firewall con [UFW](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-with-ufw-on-ubuntu-20-04-es) en Ubuntu, es necesario para agregar reglas de comunicacion con nuestro servidor, y limitar quienes pueden acceder a el, que puertos estan habilitados y demas configuraciones. Este tutorial de DigitalOcean, explica como hacerlo. Despues se puede modificar si fuera necesario.

* ### Project

  Para agregar el proyecto que se va a desplegar en este droplet, tenemos que entrar al repositio en el que se encuentra, y copiar la url del repo de ese proyecto, para clonarlo con HTTPS.

    ``` # bash / zsh
    git clone <url_repo>
    ```

  Una vez clonado, entrar a la carpeta que se clono, e instalar las dependencias tanto de la raiz como de client, y construir la aplicacion de react.

    ``` # bash / zsh
    # Para instalar las dependencias de la raiz y de client/
    npm run install-all

    # Para construir la aplicacion
    npm run build-app
    ```

* ### nginx

  **NOTA:** Al llegar hasta este punto, es preferible contar ya con un dominio y haberlo agregado a DigitalOcean para que se administre desde ahi. Consultar este [link](https://docs.digitalocean.com/products/networking/dns/) para seguir el tutorial de como hacer esta parte.

  Debido a que la aplicacion ejecuta un servidor con node, es necesario que la aplicacion corra desde un puerto para levantar este servidor, ejecutar los controllers y servir los archivos estaticos.

  Para ingresar a la aplicacion desde el dominio, y que en la url no se deba especificar el puerto de node, es necesario instalar nginx para redireccionar la ruta **localhost:port** a **localhost**.

  **NOTA:** Si este paso no se lleva a cabo, y ya se configuro ufw, no se va a poder acceder al puerto (**9000**), esencial para correr el servidor de node, ya que no esta especificado en las reglas de comunicacion de ufw.

    ``` # bash / zsh
    sudo apt install nginx
    ```

  Para configurar nginx de forma correcta como lo recomienda DigitalOcean, consultar el [tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04#step-5-%E2%80%93-setting-up-server-blocks-(recommended)) que provee DigitalOcean.

  Una vez instalado nginx, correr el siguiente comando, y dentro del archivo default, en la seccion de location / {...}, agregar el siguiente contenido.

    ``` # bash / zsh
    # Ir a la ruta del archivo de configuracion de nginx
    cd /etc/nginx/sites-available

    # Editar la configuracion de nginx
    vim default

    # Reemplazar el contenido de location /

    # First attempt to serve request as file, then
    # as directory, then fall back to displaying a 404.
    proxy_pass http://localhost:9000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Conection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    ```

  Con los siguientes comandos, se reinicia el servidor de nginx y se verifica el status del codigo que se agrego.

    ``` # bash / zsh
    # Verifica la sintaxis del archivo modificado
    nginx -t

    # Reinicia el servidor
    sudo systemctl restart nginx

    # Verifica el status de nginx, verificar el valor de **Active:**
    sudo systemctl status nginx
    ```

  Una vez configurado nginx, seguir este [tutorial](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04-es), para agregar un certificado SSL a nuestro droplet, para este paso, si es necesario ya contar con un dominio propio.

  Eliminar la version de nginex de la respuesta de los headers en las peticiones.

  ``` # bash / zsh
    sudo vim /etc/nginx/nginx.conf

    # Descomentar la siguiente linea.
    http{
      ...
      server_tokens off;
      ...
    }

    # Verifica la sintaxis del archivo modificado
    nginx -t

    # Reinicia el servidor
    sudo systemctl restart nginx

    # Verifica el status de nginx, verificar el valor de **Active:**
    sudo systemctl status nginx
  ```

  Una vez configurado nginx y los certificados SSL, es importante habilitar el protocolo **http2**, para aumentar la eficiencia y velocidad del transporte de los datos. Seguir el siguiente [tutorial](https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-with-http-2-support-on-ubuntu-20-04) que proporciona DigitalOcean para su configuracion con nginx.

* ### pm2

  Desde el droplet de nuestro proyecto, necesitamos instalar [mp2](https://pm2.keymetrics.io/), que es un administrador de procesos daemon para gestionar y mantener la aplicación en corriendo 24/7.

  Para instalar este programa hay que correr el siguiente comando desde cualquier ruta.

    ``` # bash / zsh
    npm install pm2 -g
    ```

  Para mantener la aplicacion corriendo, se debe crear un archivo de configuracion de pm2 (**ecosystem.config.js**) desde la raiz del proyecto con el siguiente comando, y ajustar todos sus valores a lo que necesita el proyecto.

    ``` # bash / zsh
    pm2 init simple

    # contenido del archivo
    module.exports = {
      apps: [{
        name: "project_name", // Reemplazar por el nombre del proyecto
        script: "./server.js",
        log_date_format: 'YYYY-MM-DD HH:mm:ss SSS',
        watch: false,
        autorestart: true,
        filter_env: [
          "REACT_"
        ],
        env: {
          PORT: "9000",
          NODE_ENV: "production",

          // Aqui van el resto de las variables .env de production
          ALLOW_ORIGINS=-------,
          DOMAIN_NAME=-------,
          NODEMAILER_TRANSPORTER_SENDER_NAME=-------,
          NODEMAILER_TRANSPORTER_KEY_SELECTOR=-------,
          NODEMAILER_TRANSPORTER_HOST=-------,
          NODEMAILER_TRANSPORTER_PORT=-------,
          NODEMAILER_TRANSPORTER_SECURE=-------,
          NODEMAILER_TRANSPORTER_AUTH_USER=-------,
          NODEMAILER_TRANSPORTER_AUTH_PASS=-------,
          NODEMAILER_FROM=-------
        }
      }]
    }
    ```

  **NOTA:** Agregar estas dos variables en el archivo **/.bashrc** del servidor.

  ``` # bash / zsh
    TITLE_PAGE
    DOMAIN_NAME,
  ```

  Todos los comandos que se necesitan para correr, detener, reiniciar y borrar el servicio con pm2, estan en los scripts de la raiz del proyecto, pero neceistan el archivo **ecosystem.config.js**.

    ``` # bash / zsh
    # Corre la aplicacion con pm2
    npm run start

    # Reinicia la aplicacion con pm2
    npm run restart

    # Detiene la aplicacion con pm2
    npm run stop

    # Borra la aplicacion con pm2
    npm run delete
    ```

  Es necesario mantener la aplicacion corriendo, incluso despues de reiniciar el servidor (droplet).

    ``` # bash / zsh
    pm2 startup systemd
    ```

  Para verificar si el servicio con pm2 se esta ejecutando al reiniciar el servidor, se ejecuta el siguiente comando. **ro** es el nombre que le pone pm2 dependiendo del usuario, asi que puede variar.

    ``` # bash / zsh
    sudo systemctl status pm2-ro
    ```

  Si el valor de **Active:** al correr el comando anterior, esta como inactive, el siguiente comando lo habilita.

    ``` # bash / zsh
    sudo systemctl start pm2-ro
    ```

  **NOTA:** Si al ejecutar cualquiera de los dos comandos anterios, sale un error como: `Job for pm2-ro.service failed because the service did not take the steps required by its unit configuration.`, el sguiente comando reiniciara el servidor y corregira este problema. Basta con reemplazar 'message', con el motivo del reinicio.

    ``` # bash / zsh
    sudo shutdown -r now 'message'
    ```

* ### DKIM

  Para poder enviar correos electronicos, se usa [nodemailer](https://nodemailer.com/about/), y es importante resaltar que para que los correos no salgan como spam, es necesario firmar los correos con DKIM, firma encriptada que se crean con el proveedor de correos personalizados.

  Una vez que se tenga los datos DKIM, el **DNS Record** se debe agregar a los dominios de DigitalOcean, como tipo TXT. Se puede seguir el siguiente [tutorial](https://www.namecheap.com/support/knowledgebase/article.aspx/10383/2176/how-to-set-up-a-dkim-record-for-private-email/) de namecheap, para agreagar este DNS a los dominios de DigitalOcean.

  Por ultimo, hace falta agregar un archivo `dkim.pem` en la siguiente ruta desde la raiz del proyecto `src/certificates/`, en el se va a guardar la **Private Key** para firmar todos los correos con DKIM.

  **NOTA:** El controller `email`, ya esta configurado para buscar este archivo (`dkim.pem`) en la siguiente ruta `src/certificates/`, por lo que la ruta y el nombre del archivo no deben cambiar para no alterar la configuracion del controller.
