const colors = {
  coral: '#FE5F55',
  white: '#FEFAFA',
  blue: '#2A324B',
  green: '#3A7D44',
  yellow: '#F2AF29',
  black: '#101720',
  teal: '#2A9D8F', // Complementa el coral y el amarillo
  beige: '#F4EBD9', // Neutro cálido que suaviza el conjunto
  navy: '#1E2A38', // Un azul más profundo que hace buen contraste con coral y amarillo
  olive: '#7D883B', // Tierra/verde más apagado, combina con verde y mostaza
  softPink: '#F6B6B6', // Acompaña bien al coral sin competir
  burntOrange: '#D95D39', // Más terroso que el coral, muy armónico
  skyBlue: '#69A9D0', // Contraste con el azul y equilibrio con el coral
};

export const themeColors = Object.fromEntries(
  Object.entries(colors).filter(([key]) => key !== 'white' && key !== 'black')
);

export default colors;

export type Colors = typeof colors;
