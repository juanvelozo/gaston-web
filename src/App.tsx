import AppRouter from './navigator';
import './index.css';
import Tostadita from './components/animated/toast/customToast.component';

function App() {
  return (
    <>
      <Tostadita />
      <AppRouter />
    </>
  );
}

export default App;

/**
 * - Consumir servicio de Resumen✅
 * - Probar lógica de refresh token✅
 * - Consumir crud de movimiento✅
 * - Consumir crud de categoria✅
 * - Integrar endpoints de perfil✅
 * - Encontrar forma mejor de controlar los errores de los servicios✅
 * - Agregar assets para foto de perfil de usuario (Tal vez hacerla con IA?)✅
 * - Ver cómo agregar assets a la base de datos✅
 * - Integrar endpoints de cambiar contraseña✅
 * - Trabajar en el responsive mobile✅
 * - Arreglar tostadita en iOS✅
 * - Buscar librería de componentes/estilos✅
 * - Las sesiones entre ambientes se comparten por alguna razón, solucionar
 * - Implementar estrategia de cacheo de datos (con react query)
 * - Hacer endpoint de recupero de contraseña
 * - Hacer ambiente de cloudinary para producción
 * - Arreglar problemas de scroll
 * - Implementar cookies en lugar de responder el token
 * - Validaciones de formularios
 * - En transacciones, hay que filtrar por mes
 * - Implementar gráficos en la home y en transacciones (tal vez módulo aparte)
 * - Analizar tráfico de datos y planes de despliegue✅
 * - Desplegar backend, frontend y base de datos✅
 * - Configurar entornos de desarrollo y producción✅
 * - Configurar CI/CD✅
 * - Buscar diseños de UI UX✅
 * - Optimizar llamados al server
 * - Hacer UI de loading✅
 * - Hacer UI de error✅
 * - Agregar microinteracciones
 * - Agregar animaciones
 * - Hacer servicio de mailing para recuperar contraseña y verificar correo
 * - Hacer lógica de familias (Hasta 5 personas)
 */
