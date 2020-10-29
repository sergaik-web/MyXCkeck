import React from 'react';
import 'antd/dist/antd.css';
import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from '../../Pages/Main/Main';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Main />
      </Router>
    </div>
  );
};

export default App;
