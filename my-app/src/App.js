import React from "react";
import Navigation from "./components/Navigation/Navigation";
import HomePage from "./components/HomePage/HomePage";
import Characters from "./components/Characters/Characters";
import CharacterView from "./components/CharacterView/CharacterView";
import EpisodeView from "./components/EpisodeView/EpisodeView";
import Episodes from "./components/Episodes/Episodes";
import "./styles.css";
import { Route } from "react-router";
import { Layout } from "antd";

const { Header, Content, Footer } = Layout;

export default class App extends React.Component {
  render() {
    return (
      <div data-test="app-div">
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Navigation />
          </Header>
          <Content>
            <div className="home-page">
              <Route exact path="/" component={HomePage} />
              <Route exact path="/characters" component={Characters} />
              <Route
                exact
                name="characterView"
                path="/characters/character/:Id"
                component={CharacterView}
              />
              <Route exact path="/episodes" component={Episodes} />
              <Route
                exact
                name="episodeView"
                path="/episodes/episode/:Id"
                component={EpisodeView}
              />
            </div>
          </Content>
          <Footer className="footer">Footer text here</Footer>
        </Layout>
      </div>
    );
  }
}
