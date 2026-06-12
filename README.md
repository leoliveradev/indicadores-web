# 📊 Indicadores Web 🇦🇷

Aplicación web para visualizar indicadores del sector TIC en Argentina, construida sobre datos abiertos de ENACOM consumidos desde una API propia.

---

## 🧱 Stack

- Framework: Next.js 16 (App Router)
- Lenguaje: TypeScript
- UI: React 19
- Estilos: Tailwind CSS 4
- Visualización de datos:
  - Recharts
  - D3-geo
- Linting: ESLint

---

## 🔗 API

Este proyecto consume datos desde:

👉 https://github.com/leoliveradev/indicadores-api  

La API centraliza y normaliza los datos abiertos de ENACOM.

---

## 📊 Funcionalidades

- Visualización de indicadores clave del sector TIC  
- Navegación por categorías:
  - Internet  
  - Comunicaciones móviles  
  - Telefonía fija  
  - TV  
  - Mercado postal  
- Indicadores agregados (accesos, penetración, etc.)
- Gráficos dinámicos e interactivos  
- Mapa de Argentina con datos geográficos (D3)  
- Tooltips enriquecidos  
- Indicadores de tendencia  
- Interfaz responsive  

---

## 🧠 Arquitectura

El proyecto sigue una arquitectura modular con separación clara de responsabilidades:

- **app/**  
  Manejo de rutas usando App Router de Next.js. Cada dominio tiene su propia sección.

- **components/**  
  Componentes organizados por feature.

- **components/ui/**  
  Componentes reutilizables desacoplados del dominio:
  - mapas
  - tooltips
  - badges
  - íconos

- **lib/**  
  Núcleo lógico de la aplicación:
  - `api/` → clientes HTTP
  - `mappers/` → normalización de datos
  - `types/` → tipado centralizado
  - `utils/` → helpers

- **hooks/**  
  Hooks personalizados para manejo de estado y lógica reutilizable

---

## ⚙️ Instalación local
```bash
git clone https://github.com/leoliveradev/indicadores-web
cd indicadores-web
npm install
```

## 🚀 Ejecución
```bash
npm run dev
```

## 🔧 Scripts

|Comando         | Descripción         |
|----------------|---------------------|
|`npm run dev`   | Desarrollo local    |
|`npm run build` | Build de producción |
|`npm start`     | Ejecutar build      |
|`npm run lint`  | Linting             |

## 🔐 Configuración
Definir la URL base de la API:
```bash
NEXT_PUBLIC_API_URL=https://tu-api.com/api/v1
```

## 🎯 Objetivo
Proveer una interfaz clara, moderna e interactiva para explorar indicadores de telecomunicaciones en Argentina, facilitando el análisis de datos públicos.

## 📄 Fuente de Datos
Los datos provienen del Portal de Datos Abiertos de ENACOM, a través de la API desarrollada para este ecosistema.