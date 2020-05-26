import React from "react";
import "../../styles.css";
import "antd/dist/antd.css";
import { Card, Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export default class Characters extends React.Component {
  constructor(props) {
    super(props);
    this.state = { characters: [], next: "" };
  }

  componentDidMount() {
    this.fetchAllCharacters();
  }

  fetchAllCharacters = () => {
    fetch("https://rickandmortyapi.com/api/character/")
      .then((response) => response.json())
      .then(({ info, results }) => {
        this.setState({ characters: results }); //update car list
        this.setState({ next: info.next });
      })
      .catch((err) => console.log(err));
  };

  onClickLoadMore = () => {
    fetch(`${this.state.next}`)
      .then((response) => response.json())
      .then(({ info, results }) => {
        this.setState({ characters: [...this.state.characters, ...results] });
        this.setState({ next: info.next });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { characters, next } = this.state;
    const gridStyle = {
      width: "25%",
      textAlign: "center",
      padding: "20px",
    };
    let cardData = characters.map((data) => {
      return (
        <Link
          to={{
            pathname: `/characters/character/${data.id}`,
            state: { data: data },
          }}
          key={data.id}
        >
          <Card.Grid style={gridStyle} key={data.id}>
            <Avatar
              shape="square"
              size={100}
              icon={<UserOutlined />}
              src={data.image}
            />
            <h1>{data.name}</h1>
          </Card.Grid>
        </Link>
      );
    });
    return (
      <div>
        <Card
          title="All characters of Ricky and Morty episodes"
          data-test="characters-card"
        >
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
