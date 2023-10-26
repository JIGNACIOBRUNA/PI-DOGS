import './App.css';
import  {Home, Landing, Form, Detail} from "./views";
import {Route, BrowserRouter} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/"><div><Landing /></div></Route>
        <Route path="/form"><div><Form /></div></Route>
        <Route path="/dog/:id"><div><Detail /></div></Route>
        <Route path="/home"><div><Home /></div></Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
