import "./App.css";
import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
//Auth
import axiosWithAuth from "./components/Auth/axiosWithAuth";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/LogIn";
//Marketing Pages
import HeaderNav from "./components/MarketingPages/HeaderNav";
import LandingPage from "./components/MarketingPages/LandingPage";
import About from "./components/MarketingPages/About";
import Pricing from "./components/MarketingPages/Pricing";
import Contact from "./components/MarketingPages/Contact";
//User Pages
import AuthorizedNav from "./components/UserPages/AuthorizedNav";
import Dashboard from "./components/UserPages/Dashboard";
import Vocabulary from "./components/UserPages/Vocabulary";
import Reading from "./components/UserPages/Reading";
import Account from "./components/UserPages/Account";
import Lessons from "./components/UserPages/Lessons";
import Reviews from "./components/UserPages/Reviews";

function App() {
  //needs to be in app.js?
  const [auth, setAuth] = useState(false); //yes
  const [user, setUser] = useState({}); //yes
  const [userLessons, setUserLessons] = useState([]); //yes
  const [vocab, setVocab] = useState([]); //yes
  const [lesson1, setLesson1] = useState([]); //probably
  const [selectedLesson, setSelectedLesson] = useState(""); //no
  const [showNav, setShowNav] = useState(true); //yes
  const [availableReviews, setAvailableReviews] = useState([]); //yes

  const token = localStorage.getItem("token"); //yes

  useEffect(() => {
    getVocab();
    if (token) {
      setAuth(true);
      getUser();
      if (user.user_vocab) {
        getAvailableReviews();
        console.log("app useEffect");
      }
    } else {
      setAuth(false);
    } //eslint-disable-next-line
  }, [auth]);

  function getVocab() {
    axiosWithAuth
      .get("vocab")
      .then((res) => {
        setVocab(res.data);
        let lesson1set = res.data.filter((word) => word.lesson === 1);
        setLesson1(lesson1set);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getUser() {
    if (token) {
      axiosWithAuth
        .get("profile")
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function getAvailableReviews() {
    // console.log("get reviews, user:", user.user_vocab);
    let reviews = user.user_vocab.filter((word) => {
      let today = new Date();
      let nextReview = new Date(word.next_review);
      // console.log("nextReview:", nextReview);
      // console.log("today:", today);
      return nextReview <= today;
    });
    setAvailableReviews(reviews);
  }

  const navToUse =
    auth && showNav ? (
      <AuthorizedNav setAuth={setAuth} />
    ) : showNav ? (
      <HeaderNav />
    ) : null;
  const landingPage = auth ? (
    <Dashboard
      user={user}
      setUser={setUser}
      setUserLessons={setUserLessons}
      userLessons={userLessons}
      availableReviews={availableReviews}
      getAvailableReviews={getAvailableReviews}
    />
  ) : (
    <LandingPage />
  );

  return (
    <div className="App">
      {navToUse}
      <Switch>
        {/* Marketing Pages */}
        <Route exact path="/">
          {landingPage}
        </Route>
        <Route path="/about" component={About} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/contact" component={Contact} />
        {/* Auth Pages */}
        <Route path="/register">
          <Register setAuth={setAuth} lesson1={lesson1} />
        </Route>
        <Route path="/login">
          <Login setAuth={setAuth} />
        </Route>
        {/* User Pages */}
        <Route path="/vocab">
          <Vocabulary
            vocab={vocab}
            selectedLesson={selectedLesson}
            setSelectedLesson={setSelectedLesson}
            user={user}
          />
        </Route>
        <Route path="/reading" component={Reading} />
        <Route path="/account">
          <Account user={user} setUser={setUser} />
        </Route>
        <Route path="/lessons">
          <Lessons
            user={user}
            setUser={setUser}
            vocab={vocab}
            setShowNav={setShowNav}
          />
        </Route>
        <Route path="/reviews">
          <Reviews
            user={user}
            setUser={setUser}
            vocab={vocab}
            setShowNav={setShowNav}
            availableReviews={availableReviews}
            getAvailableReviews={getAvailableReviews}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
