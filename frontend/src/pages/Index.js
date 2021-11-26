import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Medicamentos from "./Medicamentos";
import Cosmeticos from "./Cosmeticos";
import Suplementos from "./Suplementos";
import Bebes from "./Bebes";
import Profile from "./Profile";
import AdminDashboard from "./AdminDashboard";
import Logout from "./Logout";
import SignUp from "./Signup";
import Login from "./Login";
import getFirebase from "../firebase/firebaseconfiguration";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {GetAdmin} from "../firebase/firebaseCRUD";


export default function Index(props) {

  let auth = getAuth();
  console.log("ESTOY EN INDEX, MI UID:");
  let myUid = auth.currentUser ? auth.currentUser.uid : null;
  //console.log(myUid);
  let userAdmin = GetAdmin();
  console.log("The user admin is, ", userAdmin);
  console.log("This is an admin", userAdmin===myUid);

  const firebase = getFirebase();

  const socialLogin = async (props) => {
    await firebase
      .auth()
      .signInWithPopup(props)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signOut = async () => {
    try {
      if (firebase) {
        await firebase.auth().signOut();
        alert("Successfully signed out!");
      }
    } catch (error) {
      alert(error.message);
    }
    props.history.push("/");
    location.reload();
  };

  const loginSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log(props);
    try {
      if (props) {
        console.log("iniciando");
        const user = await firebase
          .auth()
          .signInWithEmailAndPassword(data.get("email"), data.get("password"));
        //console.log("user", user);
        props.history.push("/");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const signupSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    try {
      if (firebase) {
        const user = await firebase
          .auth()
          .createUserWithEmailAndPassword(
            data.get("email"),
            data.get("password")
          );
        console.log("user", user);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  console.log(props.currentUser);
  console.log("Estoy en index");

  return (
    <Router>
      {
        props.currentUser && userAdmin===myUid ?
        <Routes>
          <Route exact path={"/"} element={ <AdminDashboard history={props.history} firebase={props.firebase} signOut={signOut} />} />
        </Routes>
        : props.currentUser ? (
        <Routes>
          <Route exact path={"/"} element={ <Home history={props.history} firebase={props.firebase} signOut={signOut} />} />
          <Route exact path={"/medicamentos"} element={ <Medicamentos history={props.history} firebase={props.firebase} signOut={signOut} />} />
          <Route exact path={"/suplementos"} element={ <Suplementos history={props.history} firebase={props.firebase} signOut={signOut} />} />
          <Route exact path={"/cosmeticos"} element={ <Cosmeticos history={props.history} firebase={props.firebase} signOut={signOut} />} />
          <Route exact path={"/bebes"} element={ <Bebes history={props.history} firebase={props.firebase} signOut={signOut} />} />
          <Route exact path={"/profile"} element={ <Profile history={props.history} firebase={props.firebase} signOut={signOut} />} />
          <Route exact path={"/profile"} element={ <Profile history={props.history} firebase={props.firebase} signOut={signOut} />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            exact
            path={"/"}
            element={
              <Login
                firebase={props.firebase}
                loginSubmit={loginSubmit}
                history={props.history}
                socialLogin={socialLogin}
              />
            }
          ></Route>
          <Route
            exact
            path={"/signup"}
            element={
              <SignUp
                firebase={props.firebase}
                signupSubmit={signupSubmit}
                history={props.history}
              />
            }
          ></Route>
        </Routes>
      )}
    </Router>
  );
}