import imageCompression from 'browser-image-compression';

/**
 * Comprime y redimensiona una imagen antes de subirla.
 * @param file Archivo de imagen original (ej: de un input file)
 * @returns Un nuevo archivo (File) optimizado.
 */
export async function comprimirArchivoImagen(file: File): Promise<File> {
  const options = {
    maxSizeMB: 0.2, // máximo 200 KB
    maxWidthOrHeight: 300, // máximo 300px de alto o ancho
    useWebWorker: true,
    initialQuality: 0.8,
    fileType: 'image/jpeg', // Podés usar "image/webp" si tu backend lo soporta
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error('Error al comprimir imagen:', error);
    throw error;
  }
}
