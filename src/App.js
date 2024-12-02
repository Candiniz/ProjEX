import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from './components/pages/Home'
import Projects from './components/pages/Projects'
import Company from './components/pages/Company'
import Contact from './components/pages/Contact'
import NewProject from './components/pages/NewProject'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

import Container from './components/layout/Container'
import Project from './components/pages/Project';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/company" element={<Company />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/newproject" element={<NewProject />} />
          <Route path="/project/:id" element={<Project />} />
        </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
