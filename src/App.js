import { Route, Routes, BrowserRouter } from "react-router-dom";

import Register from "./firebase/auth/Register";
import Login from "./firebase/auth/Login";
import { AuthProvider } from "./firebase/auth/AuthContext";
import PrivateRoute from "./firebase/auth/PrivateRoute";

import Home from './components/pages/Home'
import Projects from './components/pages/Projects'
import Company from './components/pages/Company'
import Contact from './components/pages/Contact'
import NewProject from './components/pages/NewProject'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Project from './components/pages/Project';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Rota pública */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/company" element={<Company />} />

          {/* Rotas protegidas */}
          <Route
            path="/projects"
            element={
              <PrivateRoute>
                <Projects />
              </PrivateRoute>
            }
          />
          <Route
            path="/newproject"
            element={
              <PrivateRoute>
                <NewProject />
              </PrivateRoute>
            }
          />
          <Route
            path="/project/:id"
            element={
              <PrivateRoute>
                <Project />
              </PrivateRoute>
              }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
