# Usar una imagen oficial de Node.js
FROM node:20

# Crear directorio de trabajo
WORKDIR /usr/src/app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto que usa tu API
EXPOSE 3000

# Comando para iniciar tu servidor
CMD [ "node", "dist/main.js" ]