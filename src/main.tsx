import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './components/Login.tsx'
import Register from './components/Register.tsx'
import BaseLayout from './RootLayout/BaseLayout.tsx'
import UserLayout from './RootLayout/UserLayout.tsx'
import Profile from './components/User/Profile.tsx'
import OAuth2Success from './components/OAuth2Success.tsx'
import OAuth2Failure from './components/OAuth2Failure.tsx'
import UserDashboard from './components/User/Dashboard.tsx'
import ProtectedRouter from './ProtectedRouter/ProtectedRouter.tsx'
import AdminDashboard from './components/Admin/Dashboard.tsx'
import AdminLayout from './RootLayout/AdminLayout.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<BaseLayout/>}>
        <Route index element={<App/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />

        {/* ADMIN ROUTES */}
        <Route
          path="admin"
          element={
            <ProtectedRouter allowedRoles={["ROLE_Admin"]}>
              <AdminLayout />
            </ProtectedRouter>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>

        {/* USER ROUTES */}
        <Route
          path="user"
          element={
            <ProtectedRouter allowedRoles={["ROLE_User", "ROLE_Admin"]}>
              <UserLayout />
            </ProtectedRouter>
          }
        >
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="dashboard/profile" element={<Profile />} />
        </Route>

        <Route path='/oauth/success' element={<OAuth2Success />} />
        <Route path='/oauth/failure' element={<OAuth2Failure />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
