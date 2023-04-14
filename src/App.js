import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddForm from './pages/AddForm';

const App = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addForm" element={<AddForm />} />
      </Routes>
    </div>
  );
}

export default App;
