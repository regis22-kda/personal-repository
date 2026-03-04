import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'antd/dist/reset.css'
import './index.css'
import App from './App'
import { antdTheme } from './core/theme/antdTheme'
import { RepositoryProvider } from './core/di/RepositoryProvider'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={antdTheme}>
        <RepositoryProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </RepositoryProvider>
      </ConfigProvider>
    </QueryClientProvider>
  </StrictMode>,
)
