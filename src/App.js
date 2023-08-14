import './App.css';
import Layout from './components/layouts/layout';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter as Router

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
