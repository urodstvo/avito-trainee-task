import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Router } from '@/pages';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '@/index.css';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 30,
        },
    },
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <Router />
        </QueryClientProvider>
    </StrictMode>
);
