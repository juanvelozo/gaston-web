const colors = {
  coral: '#FE5F55',
  white: '#FEFAFA',
  blue: '#1282a2',
  green: '#3A7D44',
  yellow: '#F2AF29',
  black: '#101720',
  teal: '#2A9D8F',
  navy: '#1E2A38',
  olive: '#7D883B',
  softPink: '#F1A9F0',
  burntOrange: '#D95D39',
  skyBlue: '#69A9D0',
};

export const themeColors = Object.fromEntries(
  Object.entries(colors).filter(([key]) => key !== 'white' && key !== 'black')
);

export default colors;

export type Colors = typeof colors;
