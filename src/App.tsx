import './global.css'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { ThemeProvider } from './components/theme/theme-provider'
import { router } from './routes'
export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider storageKey="dashboard-theme" defaultTheme="dark">
        <Helmet titleTemplate="%s | dashboard-ignite" />
        <Toaster richColors />
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  )
}
