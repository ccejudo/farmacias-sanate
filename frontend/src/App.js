import { createContext } from "react";
import { BrowserRouter as Router, Routes as Switch, Route } from "react-router-dom";
import axios from "axios";
import Home from './pages/Home'
import Medicamentos from './pages/Medicamentos'
import Suplementos from './pages/Suplementos'
import Bebes from './pages/Bebes'
import Cosmeticos from './pages/Cosmeticos'
import Profile from './pages/Profile'
import AdminDashboard from "./pages/AdminDashboard";
/*
import Login from './pages/Login'
import Signup from './pages/Signup'
*/

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/inventory" element={<AdminDashboard/>}/>
        <Route exact path="/medicamentos" element={<Medicamentos/>}/> 
        <Route exact path="/suplementos" element={<Suplementos/>}/>
        <Route exact path="/bebes" element={<Bebes/>}/>
        <Route exact path="/cosmeticos" element={<Cosmeticos/>}/>
        <Route exact path="/profile" element={<Profile/>}/>
        {/*
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        */}
      </Switch>
    </Router>
  );
}

export default App;
