import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';

import CreateTask from './components/CreateTask';
import ShowTaskList from './components/ShowTaskList';
import ShowTaskDetails from './components/ShowTaskDetails';
import UpdateTaskInfo from './components/UpdateTaskInfo';
import ShowWelcome from './components/ShowWelcome';
import ShowRegister from "./components/ShowRegister";
import ShowLogin from "./components/ShowLogin";
import ShowLogout from "./components/ShowLogout";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ShowProfile from "./components/ShowProfile";

const App = () => {

  return (
      <Router>
          <Header/>
        <div>
          <Routes>
            <Route exact path='/' element={<ShowWelcome />} />
              <Route path='/register' element={<ShowRegister/>} />
              <Route path='/login' element={<ShowLogin/>} />
              <Route path='/logout' element={<ShowLogout />} />
              <Route path='/profile' element={<ShowProfile />} />
              <Route path='/tasks' element={<ShowTaskList />} />
            <Route path='/create-task' element={<CreateTask />} />
            <Route path='/edit-task/' element={<UpdateTaskInfo />} />
            <Route path='/show-task/' element={<ShowTaskDetails />} />
          </Routes>
        </div>
          <Footer />
      </Router>
  );
};

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

export default App;
