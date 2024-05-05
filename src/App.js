import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import Home from './pages/Home/Home'
import YourFiles from './pages/Files/YourFiles'
import FileContent from './components/FileContent'
import FileRecent from './pages/Files/FileRecent'


function App() {
  return (

    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home/>} />
        <Route path="/yourfiles" element={<YourFiles/>}/>
        <Route path="/file/recent" element={<FileRecent/>}/>
        <Route path="/file/:fileName" element={<FileContent />} />
      </Routes>
    </div>
    </Router>
 
  );
}

export default App;
