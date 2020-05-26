import React from "react";
import "../../styles.css";
import "antd/dist/antd.css";
import { Card, Button } from "antd";
import { Link } from "react-router-dom";
import { getEpisode } from "rickmortyapi";

//Component for rendering all the episodes
export default class Episodes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      episodes: [],
      next: 0, //counter if nextPage exists for all episodes
    };
  }
  componentDidMount() {
    this.fetchAllEpisodes();
  }

  //get all the episodes and update its next page with a counter
  fetchAllEpisodes = () => {
    getEpisode()
      .then(({ info, results }) => {
        this.setState({
          episodes: results,
          next: !!info.next ? this.state.next + 1 : this.state.next,
        });
      })
      .catch((err) => console.log(err));
  };

  //load more episodes when click on button and update next counter
  onClickLoadMore = () => {
    getEpisode({ page: this.state.next + 1 })
      .then(({ info, results }) => {
        this.setState({ episodes: [...this.state.episodes, ...results] });
        this.setState({ next: !!info.next ? this.state.next + 1 : 0 });
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

    //card-grid for all the episodes with its link to EpisodeView
    let cardData = episodes.map((data, i) => {
      return (
        <Link
          to={{
            pathname: `/episodes/episode/${data.id}`,
            state: { data: data }, //episode details
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
            <Button className="load-more-button" onClick={this.onClickLoadMore}>
              Load more...
            </Button>
          )}
        </Card>
      </div>
    );
  }
}
