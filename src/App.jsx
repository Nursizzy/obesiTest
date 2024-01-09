import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes'
import { ThemeProvider } from '@mui/material'
import { theme } from './ui/theme.js'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import './i18n'
import { Suspense } from 'react'
import CircularProgress from '@mui/material/CircularProgress'

let persistor = persistStore(store)
function App() {

    return (
      <Suspense fallback={<CircularProgress />}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <ThemeProvider theme={theme}>
              <RouterProvider router={router}>
              </RouterProvider>
            </ThemeProvider>
          </PersistGate>

        </Provider>
      </Suspense>

    )
}

export default App

