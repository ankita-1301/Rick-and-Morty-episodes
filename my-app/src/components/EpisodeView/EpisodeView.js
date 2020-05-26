import React from "react";
import "../../styles.css";
import "antd/dist/antd.css";
import { Card, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

//Component for rendering single episode
export default class EpisodeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
    };
  }

  componentDidMount() {
    this.fetchCharacters();
  }

  //fetching all the characters that the episode contains
  fetchCharacters = () => {
    const {
      location: {
        state: { data },
      },
    } = this.props;
    data.characters.forEach((characterPage) => {
      fetch(`${characterPage}`)
        .then((response) => response.json())
        .then((eachCharacter) => {
          this.setState({
            characters: [...this.state.characters, ...[eachCharacter]],
          });
        })
        .catch((err) => console.log(err));
    });
  };

  render() {
    const { characters } = this.state;
    const {
      location: {
        state: { data },
      },
    } = this.props;

    const gridStyle = {
      width: "25%",
      textAlign: "center",
      padding: "20px",
    };

    return (
      <Card
        title={`${data.episode}’s characters`}
        className="character-view-card"
      >
        {characters.map((char) => {
          return (
            <Link
              to={{
                pathname: `/characters/character/${char.id}`,
                state: { data: char },
              }}
              key={char.id}
            >
              <Card.Grid style={gridStyle} key={char.id}>
                <Avatar
                  shape="square"
                  size={100}
                  icon={<UserOutlined />}
                  src={char.image}
                />
                <h3>{char.name}</h3>
              </Card.Grid>
            </Link>
          );
        })}
      </Card>
    );
  }
}
