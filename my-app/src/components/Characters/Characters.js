import React from "react";
import "../../styles.css";
import "antd/dist/antd.css";
import { Card, Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getCharacter } from "rickmortyapi";

//Component for rendering all the characters
export default class Characters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      next: 0, //counter if nextPage exists for all characters
    };
  }

  componentDidMount() {
    this.fetchAllCharacters();
  }

  //get all the characters and update its next page with a counter
  fetchAllCharacters = () => {
    getCharacter()
      .then(({ info, results }) => {
        this.setState({
          characters: results,
          next: !!info.next ? this.state.next + 1 : this.state.next,
        });
      })
      .catch((err) => console.log(err));
  };

  //load more characters when click on button and update next counter
  onClickLoadMore = () => {
    getCharacter({ page: this.state.next + 1 })
      .then(({ info, results }) => {
        this.setState({ characters: [...this.state.characters, ...results] });
        this.setState({ next: !!info.next ? this.state.next + 1 : 0 });
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

    //card-grid for all the characters with its link to CharacterView
    let cardData = characters.map((data) => {
      return (
        <Link
          to={{
            pathname: `/characters/character/${data.id}`,
            state: { data: data }, //character details
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
