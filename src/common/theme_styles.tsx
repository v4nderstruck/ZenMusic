import {useColorScheme} from 'react-native';

const theme = () => {
  const darkMode = useColorScheme() === 'dark';
  return {
    backgroundColor: darkMode ? 'rgb(0, 0, 0)' : 'rgb(212, 212, 212)',
  };
};

export default theme;
