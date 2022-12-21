import "./App.css";
import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import Home from "./components/home/home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
