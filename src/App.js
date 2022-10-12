import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import SignUp from './components/SignUp';
import { useState } from 'react';
import Welcome from './components/Welcome';

function App() {
  const [alert, setAlert] = useState(null)

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500)
  }

  window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    if (this.localStorage.getItem('token') !== null && this.localStorage.getItem('remember') === 'false') {
      this.localStorage.removeItem('remember');
      this.localStorage.removeItem('token');
    }
  });

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className='container'>
            <Routes>
              <Route exact path="/" element={!localStorage.getItem('token') ? <Welcome showAlert={showAlert} /> : <Home showAlert={showAlert} />} />
              <Route exact path="/home" element={<Home showAlert={showAlert} />} />
              <Route exact path="/welcome" element={<Welcome showAlert={showAlert} />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/signup" element={<SignUp showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
