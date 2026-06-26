import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  return (
    <div className="container py-5">
      <h1 className="display-4">OctoFit Tracker</h1>
      <p className="lead">Modern multi-tier fitness tracking app.</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
