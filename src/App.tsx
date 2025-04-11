import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from '@/routes';
import theme from './../theme';
import { ChakraProvider } from '@chakra-ui/react';

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </ChakraProvider>
  );
};

export default App;