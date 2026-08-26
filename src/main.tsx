import App from './App.tsx'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { worker } from './mock/browser'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()
const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

worker.start().then(() => {
  createRoot(rootElement).render(
    <QueryClientProvider client={queryClient}>
      <StrictMode>
        <App />
      </StrictMode>
    </QueryClientProvider>
  )
})
