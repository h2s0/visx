import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        background: 'radial-gradient(circle at center, #2D004D, #000000)',
        color: 'white',
        fontFamily: 'SUIT-Regular',
      },
    },
  },
  colors: {
    primary: {
      50: '#F2E6FF',
      100: '#E0C2FF',
      300: '#B375FF',
      400: '#B75AFF',
      500: '#2D004D',
      600: '#7400C8',
      700: '#5C0099',
      900: '#2E004F',
    },
    green: '#7BAB70',
    red: '#CA4D5C',
  },
  components: {
    Divider: {
      baseStyle: {
        borderColor: '#5C0099',
        borderWidth: '1px',
      },
    }
  }
});

export default theme;