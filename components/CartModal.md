# CartModal Component

## Descripción
Modal centrado para el carrito de compras con fondo difuminado y animaciones suaves.

## Características

### 🎨 Diseño
- **Modal centrado**: Aparece en el centro de la pantalla
- **Backdrop difuminado**: Fondo con `backdrop-blur-md` y opacidad
- **Responsive**: Adapta su tamaño según el dispositivo
  - Móvil: `96vw` máximo, `420px` máximo
  - Desktop: `92vw` máximo, `560px` máximo
- **Altura máxima**: `80vh` con scroll interno

### 🎭 Animaciones
- **Entrada**: Scale (0.96→1) + Slide up (16px→0) + Fade in
- **Salida**: Animación inversa
- **Duración**: 300ms con easing suave
- **Backdrop**: Fade in/out en 250ms

### ♿ Accesibilidad
- **ARIA**: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
- **Focus trap**: Atrapa el foco dentro del modal
- **Tecla Esc**: Cierra el modal
- **Click fuera**: Cierra el modal
- **Scroll lock**: Bloquea el scroll del body

### 📱 Responsive
- **Botones**: Mínimo 44px de altura en móvil
- **Layout**: Botones apilados en móvil, en fila en desktop
- **Tipografía**: Tamaños adaptativos

## Uso

```tsx
import { CartModal } from "@/components/CartModal";
import { useCartModal } from "@/hooks/useCartModal";

function MyComponent() {
  const { isOpen, openModal, closeModal } = useCartModal();

  return (
    <>
      <button onClick={openModal}>Abrir Carrito</button>
      <CartModal open={isOpen} onClose={closeModal} />
    </>
  );
}
```

## Hooks Utilizados

### `useLockBodyScroll(locked: boolean)`
Bloquea el scroll del body cuando el modal está abierto.

### `useFocusTrap(active: boolean)`
Atrapa el foco dentro del modal para navegación por teclado.

### `useCartModal()`
Maneja el estado del modal (abrir/cerrar).

## Estructura Interna

```
┌─────────────────────────────────┐
│ Header (fijo) - "Carrito" + X  │
├─────────────────────────────────┤
│                                 │
│ Lista de Productos (scroll)     │
│ - Altura máxima: calc(80vh-140px)│
│ - Scroll cuando hay muchos      │
│ - Productos bien separados      │
│                                 │
├─────────────────────────────────┤
│ Footer (sticky)                 │
│ - Total: $XXX.XX                │
│ - [Limpiar] [Ir a Pago]         │
└─────────────────────────────────┘
```

## Estados

### Carrito Vacío
- Icono de carrito grande
- Mensaje "Tu carrito está vacío"
- Sin footer

### Con Productos
- Lista de productos con scroll
- Footer fijo con total y botones
- Controles de cantidad y eliminación

## Micro-interacciones

- **Hover en botones**: Leve escala y cambio de color
- **Focus visible**: Anillo de enfoque accesible
- **Transiciones**: Suaves en todos los elementos
- **Animaciones de entrada/salida**: Coordinadas y fluidas
