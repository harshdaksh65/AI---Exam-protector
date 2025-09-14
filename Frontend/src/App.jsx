import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { ToastContainer } from 'react-toastify'
import { RouterProvider } from 'react-router-dom'
import Router from './routes/Router'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Provider store={store}>
        <ToastContainer />
        <RouterProvider router={Router} />
      </Provider>
    </div>
  )
}

export default App