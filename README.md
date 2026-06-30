# DevDoc AI 🚀 · Monorepo

**DevDoc AI** es una aplicación Fullstack diseñada para desarrolladores que automatiza la creación de documentación técnica y archivos `README.md` utilizando Inteligencia Artificial. El proyecto está estructurado como un monorrepo eficiente utilizando *npm workspaces*.

---

## 🛠️ Stack Tecnológico

### Frontend
* **Framework:** Angular 22 (Signals, Standalone Components)
* **Estilos:** TailwindCSS
* **Aislamiento de Componentes:** Storybook
* **Tests E2E:** Playwright

### Backend
* **Entorno:** Node.js + Express + TypeScript
* **Base de Datos:** MongoDB (Mongoose)
* **IA:** SDK Oficial de Gemini (Google AI Studio)

---

## 📁 Estructura del Proyecto

* `/frontend`: Aplicación cliente en Angular, configuración de Storybook y tests de Playwright.
* `/backend`: API REST en Node.js, controladores de IA y modelos de datos.

---

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio e instalar dependencias
Desde la raíz del proyecto, ejecuta el siguiente comando para instalar las dependencias de todo el monorrepo de golpe gracias a los workspaces:

```bash
npm install
```

### 2. Configurar variables de entorno
Crea un archivo .env dentro de la carpeta /backend con los siguientes datos:

```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/devdoc-ai
GEMINI_API_KEY=tu_api_key_aqui
```

### 3. Scripts de Desarrollo
Para levantar el proyecto, puedes ejecutar los scripts globales desde la raíz:

Levantar el Backend:

```bash
npm run start:backend
```

Levantar el Frontend (Angular):

```bash
npm run start:frontend
```

Abrir Storybook:

```bash
cd frontend && npm run storybook
```

Ejecutar Tests de Playwright:

```bash
cd frontend && npx playwright test
```

---
