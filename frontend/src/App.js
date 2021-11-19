import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./styles.css";
import SignIn from "./pages/Login";
import Index  from "./pages/Index";
import utilsFunctions from "./functions/FirebaseFunctions";

export default function App(props) {

  const { firebase, currentUser, getCurrentUser } = utilsFunctions(props);

  useEffect((e) => {
    if (firebase) {
      firebase.auth().onAuthStateChanged((authUser) => {
        if (authUser) {
          getCurrentUser(authUser.email);
        } else {
          getCurrentUser(null);
        }
      });
    }
   
  }, []);

  const socialLogin = async (props) => {
    await firebase
      .auth()
      .signInWithPopup(props)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return currentUser === "Cargando..." ? (
    <p> cargando</p>
  ) : (
    <div className="App">
      <h1>{currentUser} </h1>

      <Index
        socialLogin={socialLogin}
        currentUser={currentUser}
        getFirebase={props.getFirebase}
        history={props.history}
      />
      {process.env.REACT_APP_VAR}
    </div>
  );
}
