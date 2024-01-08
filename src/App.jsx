import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes'
import { ThemeProvider } from '@mui/material'
import { theme } from './ui/theme.js'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

let persistor = persistStore(store)
function App() {

    return (
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <ThemeProvider theme={theme}>
              <RouterProvider router={router}>
              </RouterProvider>
            </ThemeProvider>
          </PersistGate>

        </Provider>
    )
}

export default App

