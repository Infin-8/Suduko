import './App.css';
import BoardList from './views/container/BoardList'
import Connect from './store/Provider/Connect';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import StartScreen from './views/container/StartScreen';
import BoardContainer from './views/container/BoardContainer';

function App() {

  return (
    <div className="App">
      <Connect>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StartScreen />} />
            <Route path="/boards/:diff" element={<BoardList />} />
            <Route path="/boards/:diff/:_id" element={<BoardContainer />} />
          </Routes>
        </BrowserRouter>
      </Connect>
    </div >
  );

}

export default App;
