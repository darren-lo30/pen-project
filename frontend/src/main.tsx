import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import '@fontsource/lato';
import axios from 'axios';
import { Provider } from 'react-redux';
import store from './redux/store';

// Global theme override
const theme = extendTheme({
  styles: {
    global: {
      'body': {
        overflow: 'hidden',
      },
    }
  },
  fonts: {
    body: `'Lato', sans-serif`,
  }
});

axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'https://localhost:3000'
axios.defaults.withCredentials = true;


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
)
