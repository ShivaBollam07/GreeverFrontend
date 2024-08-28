import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Courses from './Pages/Courses';
import Reads from './Pages/Reads';
import Aboutus from './Pages/Aboutus';
import Home from './Pages/Home';
import Footer from './Pages/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/reads" element={<Reads />} />
          <Route path="/about" element={<Aboutus />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;