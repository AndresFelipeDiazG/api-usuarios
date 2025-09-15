# 👥 API de Usuarios - NestJS

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  API REST para gestión de usuarios construida con <a href="http://nestjs.com" target="_blank">NestJS</a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank">
    <img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" />
  </a>
  <a href="https://nodejs.org" target="_blank">
    <img src="https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen" alt="Node Version" />
  </a>
  <a href="#" target="_blank">
    <img src="https://img.shields.io/badge/typescript-%5E5.0.0-blue" alt="TypeScript" />
  </a>
</p>

## 📋 Descripción

API REST completa para la gestión de usuarios desarrollada con NestJS, TypeScript y almacenamiento en memoria. Incluye validaciones robustas, manejo de errores profesional y arquitectura modular siguiendo las mejores prácticas de desarrollo.

### ✨ Características Principales

- 🔧 **CRUD completo** de usuarios (Crear, Leer, Actualizar, Eliminar)
- 🛡️ **Validaciones avanzadas** con class-validator
- 📧 **Verificación de email único**
- 🎯 **Manejo de errores HTTP** con excepciones personalizadas
- 📝 **DTOs tipados** para entrada y salida de datos
- 🏗️ **Arquitectura modular** con separación de responsabilidades
- 💾 **Almacenamiento en memoria** (ideal para desarrollo y pruebas)
- 🧪 **Código limpio** siguiendo principios SOLID

## 🚀 Instalación Rápida

### Prerrequisitos

- Node.js >= 18.0.0
- npm >= 8.0.0 o yarn >= 1.22.0

### ⚠️ Importante: NestJS CLI para Desarrollo

**Si planeas crear recursos adicionales** (controllers, services, modules, etc.), es **altamente recomendable** instalar NestJS CLI globalmente: [web:364][web:366]

### Pasos de Instalación

1. Clonar el repositorio
git clone https://github.com/AndresFelipeDiazG/api-usuarios
- cd api-usuarios

2. Instalar dependencias
- yarn install

3. Ejecutar en modo desarrollo
- yarn start:dev


La API estará disponible en: `http://localhost:3000`

## 📦 Dependencias

### Dependencias que debes instalar manualmente:
1. Validación y transformación de datos

- yarn add class-validator class-transformer

### Dependencias que ya vienen con NestJS por defecto:
- `@nestjs/common`
- `@nestjs/core` 
- `@nestjs/platform-express`
- `@nestjs/cli`
- `reflect-metadata`
- `typescript`
- `eslint`
- `prettier`

## ⚙️ Configuración de ESLint

El projeto utiliza la configuración base de NestJS con algunas reglas personalizadas desactivadas para mayor flexibilidad durante el desarrollo.

### Archivo `.eslintrc.js` (configuración actual):

module.exports = {
parser: '@typescript-eslint/parser',
parserOptions: {
project: 'tsconfig.json',
tsconfigRootDir: __dirname,
sourceType: 'module',
},
plugins: ['@typescript-eslint/eslint-plugin'],
extends: [
'@nestjs',
],
root: true,
env: {
node: true,
jest: true,
},
ignorePatterns: ['.eslintrc.js'],
rules: {
'@typescript-eslint/require-await': 'off',
'@typescript-eslint/await-thenable': 'off',
'@typescript-eslint/no-unsafe-assignment': 'off',
'@typescript-eslint/no-unsafe-member-access': 'off',
'@typescript-eslint/no-explicit-any': 'off',
'@typescript-eslint/no-floating-promises': 'off',
'@typescript-eslint/no-unsafe-argument': 'off',
'@typescript-eslint/no-unsafe-call': 'off',
'prettier/prettier': [
'error',
{
endOfLine: 'auto',
},
],
},
};

text

### ¿Por qué estas reglas están desactivadas?

- **`@typescript-eslint/require-await`**: Permite funciones async sin await [web:356]
- **`@typescript-eslint/await-thenable`**: Permite await en valores no Promise [web:360]
- **`@typescript-eslint/no-unsafe-*`**: Desactiva warnings de TypeScript strict mode
- **`@typescript-eslint/no-explicit-any`**: Permite uso de `any` type
- **`prettier/prettier`**: Configurado con `endOfLine: 'auto'` para compatibilidad entre sistemas operativos

## 🔧 Scripts Disponibles
Desarrollo
yarn start # Ejecutar aplicación
yarn start:dev # Modo desarrollo con hot-reload
yarn start:prod # Modo producción

Build
yarn start:build # Compilar aplicación


## 📚 Documentación de la API

### Base URL

http://localhost:3000


### Endpoints Disponibles

#### 📝 Crear Usuario
POST /usuarios

Content-Type: application/json

{
"nombre": "Juan Pérez",
"email": "juan@example.com"
}


#### 📋 Obtener Todos los Usuarios

GET /usuarios/1


#### ✏️ Actualizar Usuario
PATCH /usuarios/1
Content-Type: application/json

{
"nombre": "Juan Carlos Pérez"
}


#### 🗑️ Eliminar Usuario

**Respuesta:**
{
"message": "Usuario con ID 1 eliminado correctamente"
}


### 🚨 Códigos de Error

| Código | Descripción |
|--------|-------------|
| `400` | Bad Request - Datos inválidos o parámetros incorrectos |
| `404` | Not Found - Usuario no encontrado |
| `409` | Conflict - Email ya registrado |
| `500` | Internal Server Error |


### Validación de DTOs:

Los DTOs utilizan decoradores de `class-validator` [web:221][web:342]:

// create-usuario.dto.ts
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUsuarioDto {
@IsString({ message: 'El nombre debe ser un texto' })
@IsNotEmpty({ message: 'El nombre es obligatorio' })
nombre: string;

@IsEmail({}, { message: 'Debe ser un email válido' })
@IsNotEmpty({ message: 'El email es obligatorio' })
email: string;
}


## 🏗️ Estructura del Proyecto

src/
├── usuarios/
│ ├── dto/
│ │ ├── create-usuario.dto.ts # DTO para crear usuario
│ │ └── update-usuario.dto.ts # DTO para actualizar usuario
│ ├── interfaces/
│ │ └── user.interface.ts # Interface del modelo User
│ ├── usuarios.controller.ts # Controlador HTTP
│ ├── usuarios.service.ts # Lógica de negocio
│ └── usuarios.module.ts # Módulo de usuarios
├── app.module.ts # Módulo principal
└── main.ts # Punto de entrada con ValidationPipe

