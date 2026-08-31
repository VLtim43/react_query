import App from './App.tsx'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { worker } from './mock/browser'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 60
    }
  }
})

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

worker.start().then(() => {
  createRoot(rootElement).render(
    <QueryClientProvider client={queryClient}>
      <StrictMode>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </StrictMode>
    </QueryClientProvider>
  )
})
