import { BrowserRouter as Router, Routes as Switch, Route } from "react-router-dom";
import Home from './pages/Home'
/*
import Login from './pages/Login'
import Signup from './pages/Signup'
*/

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" element={<Home/>}/> 
        {/*
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        */}
      </Switch>
    </Router>
  );
}

export default App;
