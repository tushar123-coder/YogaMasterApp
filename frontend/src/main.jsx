import React from 'react'
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import Aos from 'aos';
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'
import { router } from './routes/router';
import Authprovider from './utilities/provider/Authprovider';


const queryClient = new QueryClient()

Aos.init();
ReactDOM.createRoot(document.getElementById('root')).render(
  
    <Authprovider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Authprovider>
    
)
