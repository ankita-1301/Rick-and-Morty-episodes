import React from "react";
import "../../styles.css";
import "antd/dist/antd.css";
import { Card, Button } from "antd";
import { Link } from "react-router-dom";

export default class Episodes extends React.Component {
  constructor() {
    super();
    this.state = { episodes: [], next: "" };
  }
  componentDidMount() {
    this.fetchAllEpisodes();
  }

  fetchAllEpisodes = () => {
    fetch("https://rickandmortyapi.com/api/episode/")
      .then((response) => response.json())
      .then(({ info, results }) => {
        this.setState({ episodes: results });
        this.setState({ next: info.next });
      })
      .catch((err) => console.log(err));
  };

  onClick = () => {
    fetch(`${this.state.next}`)
      .then((response) => response.json())
      .then(({ info, results }) => {
        this.setState({ episodes: [...this.state.episodes, ...results] });
        this.setState({ next: info.next });
      })
      .catch((err) => console.log(err));
  };
  render() {
    const { episodes, next } = this.state;
    const gridStyle = {
      width: "25%",
      textAlign: "center",
      height: "120px",
      padding: "10px",
    };
    let cardData = episodes.map((data, i) => {
      return (
        <Link
          to={{
            pathname: `/episodes/episode/${data.id}`,
            state: { data: data },
          }}
          key={data.id}
        >
          <Card.Grid style={gridStyle} key={data.id}>
            <h1>{data.episode}</h1>
            <h3>{data.name}</h3>
          </Card.Grid>
        </Link>
      );
    });
    return (
      <div>
        <Card title="All episodes of Ricky and Morty" data-test="episodes-card">
          {cardData}
          {!!next && (
            <Button className="load-more-button" onClick={this.onClick}>
              Load more...
            </Button>
          )}
        </Card>
      </div>
    );
  }
}
