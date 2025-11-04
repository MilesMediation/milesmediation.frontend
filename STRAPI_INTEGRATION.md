# Implementación de API de Strapi en Next.js

## 📋 Resumen

Se ha implementado exitosamente la integración con la API de Strapi en el lado del servidor para la página de inicio de Miles Mediation. La implementación incluye:

- ✅ **Server Components**: La página principal ahora es un Server Component
- ✅ **Fetch en el servidor**: Los datos se obtienen en el servidor antes del renderizado
- ✅ **Interfaces TypeScript**: Tipos definidos para todos los datos de la API
- ✅ **Metadata dinámica**: SEO metadata generada dinámicamente desde Strapi
- ✅ **Logging en consola**: Los datos se muestran en la consola del servidor

## 🏗️ Estructura de Archivos

### Nuevos Archivos Creados:

1. **`src/types/api.ts`** - Interfaces TypeScript para los datos de Strapi
2. **`src/lib/api.ts`** - Funciones de fetch para el servidor

### Archivos Modificados:

1. **`src/app/old_page.tsx`** - Convertido a Server Component con fetch de datos
2. **`src/app/(home)/HeroSection.tsx`** - Modificado para recibir datos del servidor
3. **`src/app/(home)/OfficeSection.tsx`** - Modificado para recibir datos del servidor

## 🔧 Configuración

### Variables de Entorno Requeridas:

```env
STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

### Endpoints de Strapi Configurados:

- ✅ `/api/page-home` - Datos de la página de inicio
- ✅ `/api/articles` - Artículos del blog
- ✅ `/api/offices` - Información de oficinas
- ✅ `/api/services` - Servicios disponibles

## 📊 Datos Obtenidos

### Page Home Data:
```typescript
{
  id: number;
  Hero: {
    main_title: string;
    description: string;
    is_available: boolean;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    // ... más campos SEO
  };
  // ... más campos
}
```

### Offices Data:
```typescript
{
  id: number;
  name: string;
  slug: string;
  Description: string;
  telephone: string;
  email: string;
  address: string;
  // ... más campos
}
```

## 🚀 Funcionalidades Implementadas

### 1. Server-Side Data Fetching
- Los datos se obtienen en el servidor antes del renderizado
- Manejo de errores con fallbacks
- Logging detallado en consola del servidor

### 2. Dynamic Metadata Generation
- Títulos y descripciones dinámicos desde Strapi
- Open Graph y Twitter Card metadata
- Fallbacks para casos de error

### 3. Component Integration
- HeroSection recibe datos dinámicos del servidor
- OfficeSection muestra oficinas reales desde Strapi
- Fallbacks para datos estáticos cuando la API falla

## 🔍 Logging en Consola

El sistema registra información detallada en la consola del servidor:

```bash
🔍 Fetching page-home data from Strapi...
✅ Page-home data fetched successfully: {
  id: 1,
  heroTitle: "Test",
  heroDescription: "a",
  seoTitle: null,
  lastUpdated: "2025-09-13T21:59:25.719Z"
}

🏠 Home page data fetched: {
  pageHome: { id: 1, heroTitle: "Test", ... },
  articlesCount: 4,
  officesCount: 2,
  errors: []
}
```

## 🛠️ Uso

### Para Desarrolladores:

1. **Verificar logs**: Los datos se muestran en la consola del servidor Next.js
2. **Modificar datos**: Cambiar datos en Strapi admin panel
3. **Ver cambios**: Los cambios se reflejan automáticamente en la página

### Para Administradores:

1. **Acceder a Strapi**: `http://localhost:1337/admin`
2. **Editar contenido**: Modificar "Page - Home" para cambiar el hero
3. **Gestionar oficinas**: Agregar/editar oficinas en la sección Offices

## 🔄 Próximos Pasos

1. **Configurar imágenes**: Mapear imágenes reales de oficinas
2. **Agregar más endpoints**: Integrar servicios, artículos, etc.
3. **Optimizar caching**: Implementar revalidación de datos
4. **Error handling**: Mejorar manejo de errores en producción

## 📝 Notas Técnicas

- **Server Components**: La página principal es ahora un Server Component
- **Type Safety**: Todas las interfaces están tipadas con TypeScript
- **Error Resilience**: Fallbacks implementados para todos los datos
- **Performance**: Fetch paralelo de múltiples endpoints
- **SEO**: Metadata dinámica generada desde Strapi
