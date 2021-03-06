/** @format */

import React from "react";
import { Col, Card, Row, Container, Alert, Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import history from "../history";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  getArtists: () => {
    dispatch(async (dispatch, getState) => {
      try {
        const response = await fetch(
          `https://deezerdevs-deezer.p.rapidapi.com/genre/152/artists`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-key":
                "b5adde9161msh8a1dcb5f94ec12fp19467bjsn5987880f6b6c",
              "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            },
          }
        );
        console.log(response);
        let artists = await response.json();
        console.log(artists.data, "Artists in a fetch");
        if (response.ok) {
          dispatch({
            type: "GET_ARTISTS",
            payload: artists.data,
          });
        }
      } catch (error) {
        console.log(error);
      }
    });
  },
  addToFav: (artists) =>
    dispatch({
      type: "ADD_TO_LIKED",
      payload: artists,
    }),
});

class ArtistCard extends React.Component {
  state = {
    genre: 152,
    artists: [],
    loading: true,
  };

  componentDidMount = async () => {
    await this.props.getArtists();
  };
  /*  
  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.genre !== this.props.genre) {
      console.log("PREVIOUS GENRE IS DIFFERENT TO THIS ONE");
      this.setState({ genre: this.props.genre });
      this.setState({ loading: true });
      console.log("GENRE ON Update BEFORE FETCHING", this.state.genre);
      this.fetchArtists();
      console.log("GENRE ON Update AFTER FETCHING", this.state.genre);
    }
  };*/

  render() {
    //console.log(this.props.artists, "Artists after fetch")
    return (
      <Row>
        {/* <h3>{this.props.artists[0].data[0].artist.name}</h3> */}
        {this.props.artists.map((artist, index) => (
          <Col xs={12} sm={6} lg={4} xl={2} key={index} className="mr-5">
            <Card>
              <img
                style={{
                  height: "20px",
                  width: "20px",
                  position: " absolute",
                  top: "10px",
                  left: "170px",
                  zIndex: "200",
                }}
                src="./img/pngwing.png"
                alt=""
                onClick={(e) => {
                  e.preventDefault();
                  this.props.addToFav(this.props.singleArtist.id);
                }}
              />
              <Card.Img
                onClick={() => this.props.history.push("/artist/" + artist.id)}
                variant="top"
                src={artist.picture_xl}
                alt="artistImage"
              />
              <Card.Body>
                <Card.Text className="text-center">{artist.name}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ArtistCard));
