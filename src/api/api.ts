// Enum con los posibles entornos
export enum EnvironmentsEnum {
  LOCAL = 'local', // npm start
  DEV = 'dev', // npm run start:dev
  PROD = 'prod', // npm run start:prod
}

// URL del backend por entorno
export const envConfig = {
  [EnvironmentsEnum.LOCAL]: 'http://localhost:3000',
  [EnvironmentsEnum.DEV]: process.env.REACT_APP_SERVER_DEV!, // canister de dev
  [EnvironmentsEnum.PROD]: process.env.REACT_APP_SERVER_PROD!, // canister de prod
};

// Detectamos el entorno actual desde variables de entorno
const serverEnvironment = process.env.REACT_APP_SERVER as EnvironmentsEnum;
const estamosEnProduccion = serverEnvironment === EnvironmentsEnum.PROD;

// Verificación básica para evitar errores de configuración. Si no hay variable de entorno seteada, el front explota.
if (!serverEnvironment) throw new Error('SERVER environment variable is not set');

if (!estamosEnProduccion) {
  // Si estamos en desarrollo o local, mostramos en qué server estamos.
  console.log('🎯 Le estamos apuntando al servidor:', serverEnvironment);
} else {
  console.log('');
}
console.log('%cTu texto aquí', 'color: red; font-weight: bold; font-size: 20px;');

// Creamos la instancia de axios con configuración común ❌❌❌[DEPRECADO]: En la versión uno, usábamos un server con requests HTTP, esto en la versión 2 cambia por consultas al canister.
// const api = axios.create({
//   baseURL: envConfig[serverEnvironment],
//   timeout: 10000,
//   withCredentials: true, // Importante: permite enviar cookies HTTP-only automáticamente
//   headers: {
//     'X-environment': serverEnvironment,
//   },
// });

// En la versión 1, acá manejábamos los errores de las consultas con los interceptors de axios. Hay que evaluar la mejor estrategia para manejar los errores en las consultas de los canister.
