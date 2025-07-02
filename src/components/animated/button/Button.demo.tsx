import { ArrowRight, Cart, Check, Refresh, User, XmarkCircleSolid } from 'iconoir-react';
import { Button } from './Button.component';

export default function ButtonExamples() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen text-sm text-black">
      {/* Primary */}
      <div className="space-y-2">
        <h2 className="font-semibold">Primary</h2>
        <div className="flex gap-4 flex-wrap">
          <Button variant="primary">Simple</Button>
          <Button variant="primary" iconLeft={<User />}>
            Con icono izquierdo
          </Button>
          <Button variant="primary" iconRight={<ArrowRight />}>
            Con icono derecho
          </Button>
          <Button variant="primary" iconLeft={<Cart />} iconRight={<ArrowRight />}>
            Ambos íconos
          </Button>
          <Button variant="primary" loading>
            Cargando...
          </Button>
          <Button variant="primary" disabled>
            Deshabilitado
          </Button>
        </div>
      </div>

      {/* Secondary */}
      <div className="space-y-2">
        <h2 className="font-semibold">Secondary</h2>
        <div className="flex gap-4 flex-wrap">
          <Button variant="secondary">Simple</Button>
          <Button variant="secondary" iconLeft={<XmarkCircleSolid />}>
            Cancelar
          </Button>
          <Button variant="secondary" iconRight={<Check />}>
            Confirmar
          </Button>
          <Button variant="secondary" loading>
            Cargando...
          </Button>
          <Button variant="secondary" disabled>
            Deshabilitado
          </Button>
        </div>
      </div>

      {/* Terciary */}
      <div className="space-y-2">
        <h2 className="font-semibold">Terciary</h2>
        <div className="flex gap-4 flex-wrap">
          <Button variant="terciary">Simple</Button>
          <Button variant="terciary" iconLeft={<Refresh />}>
            Actualizar
          </Button>
          <Button variant="terciary" iconRight={<ArrowRight />}>
            Siguiente
          </Button>
          <Button variant="terciary" loading>
            Esperando...
          </Button>
          <Button variant="terciary" disabled>
            Deshabilitado
          </Button>
        </div>
      </div>
    </div>
  );
}
