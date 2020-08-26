

import React, { Component } from "react"
import "./App.css"
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

firebase.initializeApp({
  apiKey: "AIzaSyD56_Hx_nWVfq8nV65HIGGANYCgDGeatIk",
  authDomain: "react-fire-auth-42d6b.firebaseapp.com",
  databaseURL: "https://react-fire-auth-42d6b.firebaseio.com",
  projectId: "react-fire-auth-42d6b",
  storageBucket: "react-fire-auth-42d6b.appspot.com",
  messagingSenderId: "72856953765",
  appId: "1:72856953765:web:1e99e77b1b6eab5d7bfe4c",
  measurementId: "G-9Q23F0DG5K"
})

class App extends Component {
  state = { isSignedIn: false }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      firebase.firestore().collection("users").add({
        userId:user.uid,
        email:user.email,
        userName:user.displayName,
        phoneNumber:user.phoneNumber,
        photoURL:user.photoURL
    })
      console.log("user", user)
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.isSignedIn ? (
          <span>
            <div>Signed In!</div>
            <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
            <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
            <img
              alt="profile picture"
              src={firebase.auth().currentUser.photoURL}
            />
          </span>
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </div>
    )
  }
}

export default App