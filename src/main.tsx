import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { BrowserRouter, Route, Routes } from 'react-router'
import About from './components/About.tsx'
import Login from './components/Login.tsx'
import Register from './components/Register.tsx'
import BaseLayout from './RootLayout/BaseLayout.tsx'
import Dashboard from './components/User/Dashboard.tsx'
import UserLayout from './components/User/UserLayout.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<BaseLayout/>}>
        <Route index element={<App/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/dashboard' element={<UserLayout/>}>
          <Route index element={<Dashboard/>} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
