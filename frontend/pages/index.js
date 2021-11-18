import HomeMain from '../pages/home'
import getFirebase from "../firebase/firebaseconfiguration";
import utilsFunctions from "../functions/FirebaseFunctions";
import {createBrowserHistory} from "history";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import SignUp from "../pages/Signup";
import { useRouter } from 'next/router'

export default function Home(props) {
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


  return (
    <Router>
      {currentUser ? (
        <Switch>
          <Route
            exact
            path={"/"}
            render={() => (
              <HomeMain/>
            )}
          ></Route>          
        </Switch>
      ) :
      (
        <Switch>
          <Route
            exact
            path={"/"}
            render={() => (
              <Login
                firebase={props.firebase}
                loginSubmit={loginSubmit}
                history={props.history}
                socialLogin={socialLogin}
              />
            )}
          ></Route>
          <Route
            path={"/signup"}
            render={() => (
              <SignUp
                firebase={props.firebase}
                signupSubmit={signupSubmit}
                history={props.history}
              />
            )}
          ></Route>
        </Switch>
      )}
    </Router>
  )
}
