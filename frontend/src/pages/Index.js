import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Logout from "./Logout";
import SignUp from "./Signup";
import Login from "./Login";
import getFirebase from "../firebase/firebaseconfiguration";


export default function Index(props) {
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
      {props.currentUser ? (
        <Routes>
          <Route
            exact
            path={"/"}
            element={
              <Home
              history={props.history}
              />
            }
          ></Route>
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