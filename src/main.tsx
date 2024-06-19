import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { extendTheme } from '@chakra-ui/react';
const theme = extendTheme({
  components: {
    Link: {
      variants: {
        primary: ({ colorScheme = 'purple' }) => ({
          color: `${colorScheme}.600`,
          _hover: {
            color: `${colorScheme}.800`,
          },
        }),
      },
      defaultProps: {
        variant: 'primary',
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  (
    <React.StrictMode>
      <ChakraProvider {...{ theme }}>
        <App />
      </ChakraProvider>
    </React.StrictMode>
  ),
);
