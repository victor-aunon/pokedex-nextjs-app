# 🔥 Pokédex Next.js App

Una aplicación moderna de Pokédex construida con **Next.js 15**, **TypeScript**, **Tailwind CSS** y **Arquitectura Hexagonal**. Esta aplicación permite explorar, buscar y filtrar Pokémon de todas las generaciones con una interfaz intuitiva y responsive.

## 🕹️ Live demo

Puedes probar la aplicación desplegada en Vercel en la dirección: <https://pokedex-nextjs-app-kappa.vercel.app>

## ✨ Características

- 🌍 **Internacionalización (i18n)** - Disponible en **Inglés** y **Español**
- 🔍 **Búsqueda inteligente** por nombre de Pokémon
- 🏷️ **Filtros avanzados** por tipo y generación
- 📱 **Diseño responsive** optimizado para todos los dispositivos
- 🎨 **Interfaz moderna** con animaciones suaves
- 🔊 **Sonidos de Pokémon** integrados
- 📊 **Estadísticas detalladas** con barras de progreso visuales
- 🔗 **Cadenas de evolución** interactivas
- ⚡ **Carga lazy** y estados de skeleton
- 🧪 **Suite de testing completa** (126+ tests)

## 🏗️ Arquitectura del Proyecto

Este proyecto implementa **Arquitectura Hexagonal (Clean Architecture)** combinada con **Atomic Design** para los componentes UI, con la siguiente estructura:

```
src/
├── app/                         # App Router de Next.js 15
│   ├── [lang]/                  # Rutas dinámicas por idioma (en/es)
│   │   ├── layout.tsx           # Layout con idioma
│   │   ├── page.tsx             # Página de inicio con lista de Pokémon
│   │   ├── HomePageView.tsx     # Vista de la página principal
│   │   └── pokemons/
│   │       └── [name]/
│   │           ├── page.tsx         # Página de detalle de Pokémon
│   │           ├── PokemonPageView.tsx
│   │           └── PokemonPageSkeleton.tsx
│   ├── icon.tsx                 # Generador de favicon dinámico
│   └── api/
│       └── pokemons/
│           ├── route.ts         # API endpoint para lista paginada
│           └── [name]/
│               └── route.ts     # API endpoint para Pokémon específico
├── dictionaries/                # Archivos de traducción i18n
│   ├── en.json                  # Diccionario en inglés
│   └── es.json                  # Diccionario en español
├── features/
│   └── pokemons/
│       ├── application/         # Casos de uso (Use Cases)
│       │   ├── get-pokemons-list.usecase.ts
│       │   ├── get-pokemon-chain-by-name.usecase.ts
│       │   └── get-pokemon-by-name.usecase.ts
│       ├── domain/              # Entidades y reglas de negocio
│       │   ├── entities/
│       │   │   └── pokemon.ts
│       │   ├── enums/
│       │   │   ├── types.enum.ts
│       │   │   └── generations.enum.ts
│       │   └── repositories/
│       │       └── pokemon.repository.ts
│       ├── infrastructure/      # Adaptadores externos
│       │   └── adapters/
│       │       └── pokeapi/
│       │           ├── pokeapi.adapter.ts
│       │           ├── pokeapi.mapper.ts
│       │           └── types/
│       └── presentation/        # Componentes UI y hooks
│           ├── components/
│           │   ├── NoResults.tsx
│           │   ├── PokemonCard.tsx
│           │   ├── PokemonData.tsx
│           │   ├── PokemonEvolutionChain.tsx
│           │   ├── PokemonStats.tsx
│           │   ├── PokemonTypeBadge.tsx
│           │   ├── PokemonSoundPlayer.tsx
│           │   ├── SearchAndFilterNav.tsx
│           │   └── NoResults.tsx
│           └── hooks/
│               └── usePagination.ts
├── shared/                      # Utilidades compartidas
│   ├── components/
│   │   └── ui/                  # Componentes UI base (Atomic Design)
│   │       ├── atoms/           # 🔵 Componentes atómicos básicos
│   │       │   ├── Button.tsx           # Botones reutilizables
│   │       │   ├── CardGrid.tsx         # Grid para tarjetas
│   │       │   ├── GoBackButton.tsx     # Botón de retroceso
│   │       │   ├── InputSearch.tsx      # Input de búsqueda
│   │       │   ├── Select.tsx           # Select personalizado
│   │       │   └── Skeleton.tsx         # Estados de carga
│   │       └── molecules/       # 🟢 Componentes moleculares compuestos
│   │           ├── Card.tsx                      # Tarjeta base
│   │           ├── Footer.tsx                    # Footer de la app
│   │           ├── Header.tsx                    # Header con navegación
│   │           ├── LanguageSelector.tsx          # Selector de idioma
│   │           ├── NotFoundNavigation.tsx        # Navegación 404
│   │           ├── Pagination.tsx                # Paginación completa
│   │           └── PaginationWithoutNavigation.tsx  # Paginación simple
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── schemas.ts
│   │   ├── pokemon-utils.ts
│   │   └── get-dictionary.ts    # Helpers para i18n
│   ├── providers/
│   │   └── DictionaryProvider.tsx # Context de i18n
│   └── types/
│       └── pagination.types.ts
├── middleware.ts                # Middleware de Next.js para i18n
├── i18n-config.ts               # Configuración de idiomas
└── styles/                      # Estilos globales
    ├── globals.css
    ├── base.css
    ├── theme.css
    └── pokemon.css
```

## 🌍 Internacionalización (i18n)

La aplicación está **completamente traducida** y disponible en dos idiomas:

- **🇬🇧 Inglés (English)** - Idioma por defecto
- **🇪🇸 Español (Spanish)**

### Características de i18n:

- **Detección automática** del idioma del navegador mediante `Accept-Language` headers
- **Rutas localizadas**: `/en/...` y `/es/...`
- **Selector de idioma** en el header para cambiar entre idiomas
- **Middleware personalizado** para redirección automática según preferencias del usuario
- **Context API** para acceso global a los diccionarios de traducción
- **Traducciones completas** de toda la UI: navegación, filtros, estadísticas, mensajes, etc.

### Configuración de Idiomas

El archivo `i18n-config.ts` define los idiomas disponibles:

```typescript
export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'es'],
} as const
```

### Middleware i18n

El archivo `middleware.ts` implementa:

- Detección automática del idioma preferido del usuario
- Redirección transparente a la ruta localizada correspondiente
- Negociación de contenido basada en headers HTTP
- Exclusión inteligente de assets estáticos y API routes

### Diccionarios

Los archivos de traducción en `src/dictionaries/`:

- `en.json` - Traducciones en inglés
- `es.json` - Traducciones en español

Incluyen traducciones para:
- Navegación y UI general
- Tipos de Pokémon
- Generaciones
- Estadísticas
- Mensajes de error y estados vacíos
- Labels y placeholders de formularios

## 📋 Páginas y Funcionalidades

### 🏠 Página Principal (`/[lang]`)

Rutas disponibles: `/en` (inglés) o `/es` (español)

- **Lista paginada** de todos los Pokémon
- **Barra de búsqueda** con filtrado en tiempo real
- **Filtros por tipo** (Fuego, Agua, Planta, etc.)
- **Filtros por generación** (I, II, III, etc.)
- **Grid responsive** de tarjetas de Pokémon (ciertos efectos visuales están desactivados para móvil)
- **Paginación** con navegación intuitiva
- **Selector de idioma** en el header

### 🔍 Página de Detalle (`/[lang]/pokemons/[name]`)

Rutas disponibles: `/en/pokemons/[name]` o `/es/pokemons/[name]`

- **Información completa** del Pokémon seleccionado
- **Imagen oficial** de alta calidad
- **Datos básicos**: altura, peso, especie, generación
- **Tipos** con colores característicos
- **Estadísticas base** con barras de progreso visuales
- **Cadena de evolución** interactiva con navegación
- **Reproductor de sonido** del Pokémon
- **Botón de regreso** a la lista principal
- **Todo el contenido traducido** según el idioma seleccionado

## 🚀 Instalación y Configuración

### Prerrequisitos

- **Node.js** 18+
- **pnpm** (recomendado) o npm

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd pokedex-nextjs-app
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Configuración del entorno
NODE_ENV=development

# Límite de paginación por defecto (opcional)
DEFAULT_PAGINATION_LIMIT=30

# Cantidad de Pokémon a obtener en desarrollo (opcional)
# Útil para limitar las peticiones a la API durante desarrollo
AMOUNT_OF_POKEMONS_TO_FETCH_IN_DEV=60

# Omitir validación de variables de entorno (opcional)
# SKIP_ENV_VALIDATION=true
```

### 4. Ejecutar el proyecto

```bash
# Desarrollo
pnpm dev

# Build de producción
pnpm build
pnpm start

# Preview (build + start)
pnpm preview
```

La aplicación estará disponible en `http://localhost:3000`

## 🧪 Testing

El proyecto incluye una suite completa de tests con **126+ casos de prueba** cubriendo todos los componentes y lógica de negocio.

### Ejecutar tests

```bash
# Ejecutar todos los tests
pnpm test:run

# Modo watch
pnpm test

# Con interfaz gráfica
pnpm test:ui

# Con coverage
pnpm test:coverage
```

<details>
<summary>📝 <strong>Lista Completa de Tests</strong></summary>

#### 🧩 **Componentes de Presentación**

- **PokemonCard Component** (13 tests)
  - ✅ Renderizado de información básica
  - ✅ Imágenes con atributos correctos
  - ✅ Tipos de Pokémon
  - ✅ Enlaces de navegación
  - ✅ Indicadores de evolución
  - ✅ Manejo de errores de imagen
  - ✅ Props personalizadas

- **PokemonData Component** (10 tests)
  - ✅ Tarjetas de datos del Pokémon
  - ✅ Información de altura y peso
  - ✅ Datos de generación y especie
  - ✅ Valores decimales y grandes
  - ✅ Clases CSS correctas

- **PokemonEvolutionChain Component** (12 tests)
  - ✅ Título de cadena de evolución
  - ✅ Renderizado de Pokémon en la cadena
  - ✅ Imágenes con atributos correctos
  - ✅ Enlaces de navegación
  - ✅ Indicador de Pokémon actual
  - ✅ Casos límite (cadena vacía, único)

- **PokemonSoundPlayer Component** (12 tests)
  - ✅ Botón de reproducción
  - ✅ Elemento de audio con atributos
  - ✅ Múltiples formatos de audio
  - ✅ Estados de reproducción
  - ✅ Manejo de eventos de audio
  - ✅ Gestión de errores

- **PokemonStats Component** (12 tests)
  - ✅ Título de estadísticas base
  - ✅ Etiquetas y valores de estadísticas
  - ✅ Iconos de estadísticas
  - ✅ Porcentajes de barras de progreso
  - ✅ Colores según valores
  - ✅ Casos extremos (cero, máximo)

- **PokemonTypeBadge Component** (17 tests)
  - ✅ Texto del tipo
  - ✅ Icono con atributos correctos
  - ✅ Colores de fondo por tipo
  - ✅ Capitalización del texto
  - ✅ Clases CSS correctas
  - ✅ Todos los tipos válidos de Pokémon

- **SearchAndFilterNav Component** (16 tests)
  - ✅ Input de búsqueda con atributos
  - ✅ Botón de limpiar filtros
  - ✅ Selectores de tipo y generación
  - ✅ Callbacks de cambio
  - ✅ Valores actuales en controles
  - ✅ Todas las opciones disponibles

- **NoResults Component** (7 tests)
  - ✅ Mensaje por defecto
  - ✅ Mensaje con query de búsqueda
  - ✅ Estado con filtros activos
  - ✅ Botón de limpiar filtros
  - ✅ Sugerencias de búsqueda
  - ✅ Atributos de accesibilidad

#### 🔧 **Lógica de Negocio y Hooks**

- **usePagination Hook** (10 tests)
  - ✅ Inicialización con valores por defecto
  - ✅ Filtrado por query y tipo
  - ✅ Reset de página al cambiar filtros
  - ✅ Manejo de cambios de página
  - ✅ Cálculo de páginas totales
  - ✅ Resultados paginados

- **Get Pokémons List Use Case** (6 tests)
  - ✅ Lista paginada de Pokémon
  - ✅ Método filtrado con tipo/generación
  - ✅ Manejo de errores del repositorio
  - ✅ Valores por defecto
  - ✅ Resultados vacíos

- **Pokemon Domain Entities** (4 tests)
  - ✅ Propiedades requeridas de PokemonBase
  - ✅ Valores null para propiedades opcionales
  - ✅ Extensión de PokemonItem
  - ✅ Manejo de Pokémon míticos

#### 🌐 **API y Utilidades**

- **/api/pokemons Route** (4 tests)
  - ✅ Lista paginada de Pokémon
  - ✅ Parámetros de query correctos
  - ✅ Manejo de errores del use case
  - ✅ Parámetros inválidos

- **Pokemon Utils** (4 tests)
  - ✅ Colores correctos para tipos válidos
  - ✅ Insensibilidad a mayúsculas
  - ✅ Color normal para tipos inválidos
  - ✅ Todos los tipos de Pokémon

</details>

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
pnpm dev              # Servidor de desarrollo con Turbo
pnpm build            # Build de producción
pnpm start            # Servidor de producción
pnpm preview          # Build + Start

# Testing
pnpm test             # Tests en modo watch
pnpm test:run         # Ejecutar tests una vez
pnpm test:ui          # Interfaz gráfica de tests
pnpm test:coverage    # Tests con coverage

# Calidad de código
pnpm check            # Verificar con Biome
pnpm check:write      # Autofix con Biome
pnpm check:unsafe     # Autofix inseguro con Biome
pnpm typecheck        # Verificar tipos TypeScript
```

## 🎨 Stack Tecnológico

### Core

- **[Next.js 15](https://nextjs.org)** - Framework React con App Router
- **[TypeScript](https://www.typescriptlang.org)** - Tipado estático
- **[Tailwind CSS](https://tailwindcss.com)** - Framework CSS utility-first
- **[Tailwind CSS v4](https://tailwindcss.com/blog/tailwindcss-v4-alpha)** - Nueva versión con mejor performance

### Internacionalización

- **[Negotiator](https://github.com/jshttp/negotiator)** - Negociación de contenido HTTP
- **[@formatjs/intl-localematcher](https://formatjs.io/)** - Matching de locales según estándares de i18n
- **Context API** - Gestión de estado global para diccionarios

### UI y Componentes

- **[Radix UI](https://www.radix-ui.com)** - Componentes primitivos accesibles
- **[Lucide React](https://lucide.dev)** - Iconos SVG modernos
- **[Class Variance Authority](https://cva.style/docs)** - Variantes de componentes
- **[Tailwind Merge](https://github.com/dcastil/tailwind-merge)** - Fusión inteligente de clases
- **[Framer Motion](https://www.framer.com/motion/)** - Animaciones declarativas
- **Atomic Design** - Metodología de diseño de componentes (atoms/molecules)

### Validación de datos de entrada

- **[Zod](https://zod.dev)** - Validación de esquemas TypeScript

### Testing

- **[Vitest](https://vitest.dev)** - Framework de testing rápido
- **[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)** - Testing de componentes React
- **[MSW](https://mswjs.io)** - Mock Service Worker para APIs
- **[Happy DOM](https://github.com/capricorn86/happy-dom)** - DOM environment para tests

### Herramientas de Desarrollo

- **[Biome](https://biomejs.dev)** - Linter y formatter ultrarrápido
- **[Husky](https://typicode.github.io/husky/)** - Git hooks
- **[lint-staged](https://github.com/lint-staged/lint-staged)** - Linting en archivos staged

### Validación de Entorno

- **[@t3-oss/env-nextjs](https://env.t3.gg)** - Validación de variables de entorno

## 🌐 API Externa

Esta aplicación consume la **[PokéAPI](https://pokeapi.co/)** oficial para obtener datos de Pokémon:

- **Información básica**: nombre, ID, tipos, altura, peso
- **Estadísticas**: HP, Ataque, Defensa, etc.
- **Imágenes oficiales**: artwork de alta calidad
- **Cadenas de evolución**: relaciones entre Pokémon
- **Datos de especies**: información adicional y sonidos
