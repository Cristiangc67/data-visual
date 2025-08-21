# Lector y Visualizador de Archivos CSV
Este proyecto es una aplicación web interactiva que permite a los usuarios cargar archivos CSV, visualizar los datos en una tabla dinámica y generar gráficos de barras personalizables para analizar la información. Está construido con React, TypeScript y Vite, y utiliza Tailwind CSS para el diseño y Recharts para la visualización de datos.

<img width="1600" height="949" alt="dataviz" src="https://github.com/user-attachments/assets/ec7177a0-c766-4acd-be51-2e10c9526ee9" />


# ✨ Características
Carga de Archivos CSV: Interfaz intuitiva para seleccionar o arrastrar y soltar archivos CSV.

Validación de Archivos: El sistema verifica que el archivo cargado sea de tipo CSV para evitar errores.

Visualización en Tabla: Los datos del CSV se muestran en una tabla clara y con buen formato, con desplazamiento vertical y horizontal para manejar grandes conjuntos de datos.

Búsqueda y Filtrado en Tiempo Real: Un campo de búsqueda permite filtrar dinámicamente los registros de la tabla.

Gráficos de Barras Interactivos: Visualiza los datos a través de un gráfico de barras.

Ejes Personalizables: Permite al usuario seleccionar qué columnas del CSV se usarán para los ejes X e Y del gráfico, recalculando la visualización al instante.

Diseño Responsivo: La interfaz se adapta a diferentes tamaños de pantalla, desde dispositivos móviles hasta computadoras de escritorio.

Manejo de Estados: Muestra indicadores de carga mientras se procesa el archivo y mensajes de error claros si algo sale mal.

# 🚀 Tecnologías Utilizadas
- Framework: React 19

- Lenguaje: TypeScript

- Bundler: Vite

- Estilos: Tailwind CSS

- Visualización de Datos: Recharts

- Linting: ESLint

# 🛠️ Instalación y Uso

### Clona el repositorio:
```
git clone https://github.com/tu-usuario/data-visual.git
cd data-visual
```
### Instala las dependencias:
```
npm install
```

### Inicia el servidor de desarrollo:
```
npm run dev
```

La aplicación se abrirá automáticamente en tu navegador en http://localhost:5173.

### Cómo usar la aplicación
1. **Carga un archivo**: Haz clic en el área designada o arrastra un archivo .csv.

2. **Explora los datos**: Una vez cargado, verás una tabla con todos los datos del archivo.

3. **Filtra la información**: Usa la barra de "Búsqueda" para filtrar los registros por cualquier valor.

4. **Visualiza el gráfico**:

   - Selecciona la columna que deseas usar como categoría en el **"Eje X"**.

   - Selecciona la columna con valores numéricos que quieres analizar en el **"Eje Y"**.

   - El gráfico de barras se actualizará automáticamente, mostrando el promedio de los valores del Eje Y para cada categoría del Eje X.

# 📁 Estructura del Proyecto
El proyecto está organizado en componentes reutilizables para una mejor mantenibilidad.
```
data-visual/
├── public/
└── src/
    ├── components/         # Componentes reutilizables de React
    │   ├── ChartB.tsx      # Componente del gráfico de barras (Recharts)
    │   ├── Controls.tsx    # Contenedor para los controles (búsqueda, selectores)
    │   ├── Error.tsx       # Componente para mostrar mensajes de error
    │   ├── Loader.tsx      # Animación de carga
    │   ├── Select.tsx      # Componente de selección de ejes
    │   ├── Table.tsx       # Componente de la tabla de datos
    │   └── Upload.tsx      # Componente para la carga de archivos
    ├── interfaces/         # Definiciones de tipos y interfaces de TypeScript
    │   └── interfaces.ts
    ├── utils/              # Funciones de utilidad (ej. parseCsv)
    │   └── utils.ts
    ├── App.css             # Estilos globales
    ├── App.tsx             # Componente principal de la aplicación
    └── main.tsx            # Punto de entrada de la aplicación
├── .eslintrc.cjs
├── package.json
└── tsconfig.json
```
