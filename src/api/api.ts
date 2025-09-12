import { Actor, HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { AuthClient } from '@dfinity/auth-client';
import { idlFactory } from '../declarations/server/server.did.js';
import type { _SERVICE } from '../declarations/server/server.did.js';

// Enum con los posibles entornos
export enum EnvironmentsEnum {
  LOCAL = 'local', // npm start
  DEV = 'dev', // npm run start:dev
  PROD = 'prod', // npm run start:prod
}

// Configuración del canister por entorno
export const envConfig = {
  [EnvironmentsEnum.LOCAL]: {
    host: 'https://ic0.app',
    canisterId: process.env.REACT_APP_CANISTER_ID_SERVER || '2uurk-ziaaa-aaaab-qacla-cai', // Tu canister ID real
    fetchRootKey: false,
  },
  [EnvironmentsEnum.DEV]: {
    host: 'https://ic0.app',
    canisterId: process.env.REACT_APP_SERVER_DEV!, // canister de dev
    fetchRootKey: false,
  },
  [EnvironmentsEnum.PROD]: {
    host: 'https://ic0.app',
    canisterId: process.env.REACT_APP_SERVER_PROD!, // canister de prod
    fetchRootKey: false,
  },
};

// Detectamos el entorno actual desde variables de entorno
const serverEnvironment = process.env.REACT_APP_SERVER as EnvironmentsEnum;
const estamosEnProduccion = serverEnvironment === EnvironmentsEnum.PROD;

// Verificación básica para evitar errores de configuración
if (!serverEnvironment) {
  throw new Error('REACT_APP_SERVER environment variable is not set');
}

if (!estamosEnProduccion) {
  // Si estamos en desarrollo o local, mostramos en qué server estamos
  console.log('🎯 Le estamos apuntando al servidor:', serverEnvironment);
  console.log('🔗 Host:', envConfig[serverEnvironment].host);
  console.log('🆔 Canister ID:', envConfig[serverEnvironment].canisterId);
} else {
  console.log('🚀 Ejecutándose en producción');
}

// Configuración del entorno actual
const currentConfig = envConfig[serverEnvironment];

// Función para crear el agente con autenticación
const createAuthenticatedAgent = async (): Promise<HttpAgent> => {
  const authClient = await AuthClient.create();

  // Verificar si el usuario está autenticado
  if (!(await authClient.isAuthenticated())) {
    throw new Error('Usuario no autenticado. Por favor, inicia sesión.');
  }

  const agent = new HttpAgent({
    host: currentConfig.host,
    identity: authClient.getIdentity(),
    ...(currentConfig.fetchRootKey && { fetchRootKey: true }),
  });

  return agent;
};

// Crear el actor del canister con autenticación
export const createCanister = async (): Promise<_SERVICE> => {
  const agent = await createAuthenticatedAgent();

  return Actor.createActor<_SERVICE>(idlFactory, {
    agent,
    canisterId: Principal.fromText(currentConfig.canisterId),
  });
};

// Mantener compatibilidad con código existente (deprecated)
export const canister = {
  getTransactions: async () => {
    const canisterInstance = await createCanister();
    return canisterInstance.getTransactions();
  },
  createTransaction: async (request: any) => {
    const canisterInstance = await createCanister();
    return canisterInstance.createTransaction(request);
  },
  updateTransaction: async (request: any) => {
    const canisterInstance = await createCanister();
    return canisterInstance.updateTransaction(request);
  },
  getCategories: async () => {
    const canisterInstance = await createCanister();
    return canisterInstance.getCategories();
  },
  createCategory: async (request: any) => {
    const canisterInstance = await createCanister();
    return canisterInstance.createCategory(request);
  },
  updateCategory: async (request: any) => {
    const canisterInstance = await createCanister();
    return canisterInstance.updateCategory(request);
  },
};

// Función para obtener el principal actual del usuario
export const getCurrentPrincipal = async (): Promise<Principal> => {
  try {
    const authClient = await AuthClient.create();

    if (!(await authClient.isAuthenticated())) {
      throw new Error('Usuario no autenticado');
    }

    return authClient.getIdentity().getPrincipal();
  } catch (error) {
    console.error('Error obteniendo principal:', error);
    throw new Error('No se pudo obtener el principal del usuario');
  }
};

// Función para verificar la conexión con el canister
export const checkCanisterConnection = async (): Promise<boolean> => {
  try {
    // Intentar una consulta simple para verificar la conexión
    const canisterInstance = await createCanister();
    await canisterInstance.getCategories();
    return true;
  } catch (error) {
    console.error('Error de conexión con el canister:', error);
    return false;
  }
};

// Función para obtener información del entorno actual
export const getEnvironmentInfo = () => {
  return {
    environment: serverEnvironment,
    host: currentConfig.host,
    canisterId: currentConfig.canisterId,
    isProduction: estamosEnProduccion,
    isLocal: serverEnvironment === EnvironmentsEnum.LOCAL,
    isDev: serverEnvironment === EnvironmentsEnum.DEV,
  };
};

// Exportar la configuración para uso en otros archivos
export { serverEnvironment, estamosEnProduccion, currentConfig };
