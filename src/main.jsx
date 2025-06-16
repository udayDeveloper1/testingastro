import { createRoot } from 'react-dom/client'
import './index.css'
// import AgoraRTC from "agora-rtc-sdk-ng";

import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import App from './App.jsx'
import { AuthProvider } from './component/auth/AuthProvider.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'
import store from './storemain/index.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AuthProvider>
      <LanguageProvider>
        <App />
        <ToastContainer limit={1} autoClose={2000} />
      </LanguageProvider>
    </AuthProvider>
  </Provider>
)
