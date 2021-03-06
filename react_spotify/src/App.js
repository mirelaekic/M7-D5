import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavBar from "./components/NavBar";
import FooterPlayer from "./components/FooterPlayer";
import HomePage from "./components/HomePage";
import ArtistPage from "./components/ArtistPage";
import AlbumPage from "./components/AlbumPage";
import Liked from "./components/Liked";
import "./App.css";

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <NavBar />
        <Route path="/" exact render={(props) => <HomePage {...props} />} />
        <Route
          path="/artist/:id"
          render={(props) => <ArtistPage {...props} />}
        />
        <Route
          path="/album/:id"
          render={(props) => (
            <AlbumPage {...props} />
          )}
        />
        <Route path="/yourLibrary/" exact component={Liked} />
      </BrowserRouter>
    );
  }
}

export default App;
