import React from "react";
import "../../styles.css";
import "antd/dist/antd.css";
import { Card, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

//Component for rendering single character
export default class CharacterView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      episodes: [],
      recommendations: [],
      species: "",
    };
  }

  componentDidMount() {
    this.fetchEpisodes();
    this.fetchRecommendations();
  }

  //fetching all the episodes that the character belongs to
  fetchEpisodes = () => {
    const {
      location: {
        state: { data },
      },
    } = this.props;
    data.episode.forEach((episodePage) => {
      fetch(`${episodePage}`)
        .then((response) => response.json())
        .then((eachEpisode) => {
          this.setState({
            episodes: [...this.state.episodes, ...[eachEpisode]],
          });
        })
        .catch((err) => console.log(err));
    });
  };

  //fetching episode(s) recommendations of the same species
  fetchRecommendations = () => {
    const {
      location: {
        state: {
          data: { species },
        },
      },
    } = this.props;

    fetch(`https://rickandmortyapi.com/api/character/?species=${species}`)
      .then((response) => response.json())
      .then(({ results }) => {
        results.forEach((character) => {
          character.episode.forEach((eachEpisode) => {
            fetch(`${eachEpisode}`)
              .then((response) => response.json())
              .then((episodeData) => {
                this.setState({
                  recommendations: [
                    ...this.state.recommendations,
                    ...[episodeData],
                  ],
                });
              })
              .catch((err) => console.log(err));
          });
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { episodes, recommendations } = this.state;
    const {
      location: {
        state: { data },
      },
    } = this.props;

    //remove duplicates in recommended episodes
    let relevantRecommends = Array.from(
      new Set(recommendations.map((a) => a.id)) //all IDs
    )
      .map((id) => recommendations.find((a) => a.id === id)) //duplicate IDs
      .filter((o) => !episodes.find((o2) => o.id === o2.id)); //filtering IDs

    const gridStyle = {
      width: "25%",
      textAlign: "center",
      height: "120px",
      padding: "10px",
    };

    return (
      <div data-test="characterView-div">
        <h1>{data.name}</h1>
        <Avatar
          shape="square"
          size={200}
          icon={<UserOutlined />}
          src={data.image}
          className="character-avatar"
        />
        <h5> Status : {data.status}</h5>
        <h5> Species : {data.species}</h5>
        <h5> Gender : {data.gender}</h5>
        <h5> Type : {data.type}</h5>
        <Card
          title="Episodes"
          className="episode-view-card"
          data-test="charView-episode"
        >
          {episodes.map((episode) => {
            return (
              <Link
                to={{
                  pathname: `/episodes/episode/${episode.id}`,
                  state: { data: episode },
                }}
                key={episode.id}
              >
                <Card.Grid style={gridStyle} key={episode.id}>
                  <h1>{episode.episode}</h1>
                  <h3>{episode.name}</h3>
                </Card.Grid>
              </Link>
            );
          })}
        </Card>
        <Card title="Recommended Episodes">
          {relevantRecommends.map((relevantRecc) => {
            return (
              <Link
                to={{
                  pathname: `/episodes/episode/${relevantRecc.id}`,
                  state: { data: relevantRecc },
                }}
                key={relevantRecc.id}
              >
                <Card.Grid style={gridStyle} key={relevantRecc.id}>
                  <h1>{relevantRecc.episode}</h1>
                  <h3>{relevantRecc.name}</h3>
                </Card.Grid>
              </Link>
            );
          })}
        </Card>
      </div>
    );
  }
}
