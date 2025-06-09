import { createRoot } from 'react-dom/client'
import './index.css'
// import AgoraRTC from "agora-rtc-sdk-ng";

import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import App from './App.jsx'
import { AuthProvider } from './component/auth/AuthProvider.jsx'
import store from './storemain/index.js'
import { LanguageProvider } from './context/LanguageContext.jsx'
// import i18n from "./i18n.js";
// import * as pdfjsLib from "pdfjs-dist/build/pdf";
// Set the worker source from CDN
// pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={store}>
    <AuthProvider>
      <LanguageProvider>
        <App />
        <ToastContainer limit={1} autoClose={2000} />
      </LanguageProvider>
    </AuthProvider>
  </Provider>
  // </StrictMode>,
)
